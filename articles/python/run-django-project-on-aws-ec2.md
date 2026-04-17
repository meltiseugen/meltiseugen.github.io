---
title: Run a Django Project on AWS EC2 with Nginx and Gunicorn
parent: Python
grand_parent: Articles
nav_order: 2
---

[run-django-project-on-aws-ec2](https://github.com/meltiseugen/run-django-project-on-aws-ec2) is a practical walkthrough for deploying a Django application on an AWS EC2 instance.

The goal is to start from a plain Ubuntu server, clone a Django project onto it, test the app directly, then put Nginx and Gunicorn in front of it so the application can be accessed over HTTP and HTTPS.

The final request flow looks like this:

```text
Browser -> AWS security group -> Nginx -> Gunicorn -> Django
```

Nginx is the public-facing web server. Gunicorn is the Python WSGI process that runs Django. EC2 is the machine where both pieces live.

## 1. Create an AWS account and an EC2 instance

First, create an AWS account and launch an EC2 instance.

For a small learning deployment, the important choices are:

- Use a small free-tier instance type such as `t2.micro`.
- Use an Ubuntu server image.
- Keep storage modest; the free tier commonly covers enough SSD storage for a test Django deployment.
- Save the generated `.pem` key file and do not lose it.

The `.pem` file is the private key used to connect to the instance over SSH. Without it, you will not be able to access the server through the normal SSH flow.

## 2. Create a generic EC2 Git user

To clone a private repository onto the EC2 instance, create a separate Git user for the server in your Git provider, such as GitHub or GitLab.

Give that user read-only access to the repository.

This keeps the deployment safer. The EC2 server only needs to pull code. It does not need your personal Git account, and it does not need write access to the repository.

## 3. Generate a public SSH key on the EC2 instance

Connect to the EC2 instance with the `.pem` file:

```sh
ssh -i <path-to-your-pem-file> ubuntu@<instance-ip-or-hostname>
```

Once you are inside the server, generate a new SSH key:

```sh
ssh-keygen -t rsa
```

That creates a public key at:

```text
~/.ssh/id_rsa.pub
```

Print it in the terminal:

```sh
cat ~/.ssh/id_rsa.pub
```

Copy the full output. This is the public key you will add to the generic Git user.

## 4. Add the public key to the generic Git user

Log in to your Git provider using the generic EC2 Git user. Go to the user's SSH key settings and add the public key from the EC2 instance.

After this, the EC2 instance can clone the repository over SSH:

```text
EC2 instance -> SSH key -> Git provider -> repository clone
```

This is cleaner than copying your personal SSH key onto the server.

## 5. Clone the Django project

On the EC2 instance, create a clean place for Git repositories:

```sh
mkdir -p ~/git/<git-service-name>
cd ~/git/<git-service-name>
```

Then clone the Django project:

```sh
git clone ssh@<repo-location>
```

At this point, the project code is on the server and you can install dependencies, configure settings, and run Django commands.

## 6. Test Django by exposing a custom port

Before adding Nginx and Gunicorn, test the Django app directly. This proves the project can run on the server before introducing more infrastructure.

Assume the Django app will run on port `8000`.

In the AWS console:

- Go to the EC2 instance security group.
- Edit the inbound rules.
- Add a custom TCP rule for port `8000`.
- Save the rule.

Then update Django's `ALLOWED_HOSTS` in `settings.py`.

For the test, change:

```py
ALLOWED_HOSTS = []
```

to:

```py
ALLOWED_HOSTS = ["<instance-ip>", "<instance-hostname>"]
```

Now start Django:

```sh
python manage.py runserver 0.0.0.0:8000
```

Open the app in the browser:

```text
http://<instance-hostname>:8000
```

If everything is wired correctly, you should see the Django welcome page or your application.

This port `8000` exposure is only a test step. After Nginx and Gunicorn are configured, public traffic should go through port `80` for HTTP or port `443` for HTTPS.

## 7. Add Nginx and Gunicorn for HTTP traffic

The goal now is to stop asking users to include `:8000` in the URL.

Instead of this:

```text
http://<instance-hostname>:8000
```

users should access:

```text
http://<instance-hostname>
```

To do that, Nginx listens on port `80` and forwards requests to the Django process running internally on `127.0.0.1:8000`.

First, open HTTP traffic in AWS:

- Go to the EC2 security group.
- Edit inbound rules.
- Add an HTTP rule for port `80`.
- Allow traffic from the appropriate source. For a public test, that usually means anywhere.

Install Nginx:

```sh
sudo apt-get install nginx
```

Open the Nginx config:

```sh
sudo nano /etc/nginx/nginx.conf
```

The original tutorial changes the first line to:

```text
user ubuntu;
```

Then open the default site config:

```sh
sudo nano /etc/nginx/sites-enabled/default
```

Add or update a `server` block like this:

```nginx
server {
  server_name 127.0.0.1 yourhost@example.com;
  access_log /var/log/nginx/domain-access.log;
  error_log  /var/log/nginx/nginx-error.log info;

  location / {
    proxy_pass_header Server;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Scheme $scheme;
    proxy_connect_timeout 10;
    proxy_read_timeout 10;

    # Forward public HTTP traffic to the local Django/Gunicorn process.
    proxy_pass http://127.0.0.1:8000/;
  }
}
```

Start Nginx:

```sh
sudo service nginx start
```

Now open:

```text
http://<instance-hostname>
```

At this point you may see the Nginx welcome page until Gunicorn is running and the proxy config is active. That is still progress: it proves port `80` reaches Nginx.

## 8. Add Gunicorn to run the Django WSGI application

Django's development server is useful for testing, but Gunicorn is the process that should run the Django WSGI application behind Nginx.

Install Gunicorn:

```sh
pip install gunicorn
```

Move into the directory containing `wsgi.py`:

```sh
cd <directory-with-wsgi.py>
```

Start Gunicorn and bind it to localhost on port `8000`:

```sh
gunicorn wsgi -b 127.0.0.1:8000 --pid /tmp/gunicorn.pid --daemon
```

This tells Gunicorn to:

- Load the `wsgi` application.
- Listen only on `127.0.0.1:8000`.
- Store the process ID in `/tmp/gunicorn.pid`.
- Run in the background with `--daemon`.

After this, Nginx can proxy public requests to Gunicorn.

The important split is:

```text
Nginx listens publicly on port 80.
Gunicorn listens locally on 127.0.0.1:8000.
Django runs inside Gunicorn.
```

If you do not need HTTPS for the tutorial, you can skip to "Putting it all together".

## 9. Configure HTTPS connections

To accept HTTPS traffic, the instance needs three things:

- A certificate and private key.
- An Nginx server block listening on port `443`.
- An EC2 security group rule allowing HTTPS traffic.

The original tutorial uses manually generated certificates. That is useful for understanding the moving parts. For a real public site, a service like Let's Encrypt is usually a better option because it handles trusted certificates and renewal.

## 9.1 Generate SSL certificates

Create a directory for Nginx certificates and move into it:

```sh
sudo mkdir -p /etc/nginx/certs
cd /etc/nginx/certs
```

Generate a CA key and certificate:

```sh
sudo openssl genrsa -des3 -out ca.key 4096
sudo openssl req -new -x509 -days 365 -key ca.key -out ca.crt
```

Generate a server key and certificate signing request:

```sh
sudo openssl genrsa -des3 -out server.key 1024
sudo openssl req -new -key server.key -out server.csr
```

Sign the server certificate with the CA certificate and key:

```sh
sudo openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt
```

Remove the passphrase from the server key so Nginx can start without asking for it interactively:

```sh
sudo openssl rsa -in server.key -out temp.key
sudo rm server.key
sudo mv temp.key server.key
```

## 9.2 Configure Nginx to listen for HTTPS

Open the default Nginx site config again:

```sh
sudo nano /etc/nginx/sites-enabled/default
```

Add a server block for HTTPS:

```nginx
server {
    listen          443 ssl;
    server_name     yourhost@example.com;

    ssl_certificate     /etc/nginx/certs/server.crt;
    ssl_certificate_key /etc/nginx/certs/server.key;

    location / {
        proxy_pass http://127.0.0.1:8000/;
    }
}
```

This means HTTPS traffic terminates at Nginx, and Nginx still forwards the request to Gunicorn over localhost.

## 9.3 Allow HTTPS traffic in EC2

Go back to the AWS console:

- Open the EC2 security group.
- Edit inbound rules.
- Add an HTTPS rule for port `443`.
- Save the rule.

Without this rule, Nginx can listen on `443`, but outside traffic will still be blocked before it reaches the server.

## 9.4 Test HTTPS

Restart Nginx:

```sh
sudo service nginx restart
```

Then open:

```text
https://<instance-hostname>
```

If the certificate is self-signed, the browser may show a warning. That is expected for this learning setup.

## 10. Putting it all together

The original checklist has three important pieces:

```sh
python manage.py runserver
gunicorn wsgi -b 127.0.0.1:8000 --pid /tmp/gunicorn.pid --daemon
sudo service nginx start
```

The role of each command is different:

- `python manage.py runserver` is useful earlier to prove Django can start.
- `gunicorn wsgi -b 127.0.0.1:8000 --pid /tmp/gunicorn.pid --daemon` runs the Django WSGI application for the Nginx proxy.
- `sudo service nginx start` starts the public-facing web server.

For the final HTTP or HTTPS flow, Gunicorn should be the process serving Django behind Nginx. `runserver` is mainly a test step, not the long-term production process.

## 11. Conclusion

After the EC2 security group, Nginx config, Gunicorn process, and Django settings are aligned, the application should be reachable at:

```text
http://<instance-hostname>
```

or:

```text
https://<instance-hostname>
```

The key idea is not the individual commands; it is the separation of responsibilities.

- EC2 provides the server.
- Git pulls the project onto the server.
- Django provides the application.
- Gunicorn runs the Django WSGI process.
- Nginx receives public traffic and proxies it to Gunicorn.
- AWS security groups decide which ports the outside world can reach.

For a stable deployment, consider assigning an Elastic IP or connecting a DNS record so the address does not change when the instance restarts.

## What I would improve next

This tutorial is intentionally manual, which makes it good for learning. For a longer-lived deployment, I would add a few production-focused improvements:

- Run Gunicorn through `systemd` instead of starting it manually with `--daemon`.
- Use environment variables for Django secrets, database credentials, and deployment-specific settings.
- Add a real deployment script so pulling code, installing dependencies, collecting static files, and restarting services are repeatable.
- Configure Nginx for static files and media files instead of sending everything through Django.
- Use Let's Encrypt certificates for public HTTPS.
- Assign an Elastic IP or DNS record so the application address does not change when the instance restarts.
- Add basic logging and monitoring before treating the server as production-ready.
