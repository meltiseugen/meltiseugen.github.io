---
title: Django JWT Authentication Plugin
parent: Python
grand_parent: Articles
nav_order: 1
published: false
---

The [django-jwt-authentication-plugin](https://github.com/meltiseugen/django-jwt-authentication-plugin) repository is a small Django REST Framework authentication app built around JSON Web Tokens. The main goal is pragmatic: drop a reusable `authentication` app into an existing Django project and immediately get login, token refresh, and user registration routes.

This is not trying to replace Django REST Framework or Simple JWT. It is a thin integration layer that gives a project a ready-made starting point for authentication, while still leaving the app easy to copy, modify, and grow with project-specific rules.

## What the plugin provides

The app exposes three core routes:

- `auth/login` obtains an access token and refresh token.
- `auth/token/refresh` refreshes an access token using Simple JWT.
- `auth/users/register` creates a new user through a DRF viewset action.

Under the hood, the repository depends on:

- `django`
- `djangorestframework`
- `djangorestframework-simplejwt`

That dependency list is intentionally small. Most of the heavy lifting stays inside Django, DRF, and Simple JWT.

## How it is structured

The repository centers on an `authentication` Django app:

- `urls.py` wires up the authentication routes.
- `views.py` defines the registration endpoint and the custom login view.
- `serializers/read.py` customizes the JWT login response.
- `serializers/write.py` handles user creation.

The login path is the most important customization. Simple JWT already knows how to validate credentials and issue tokens, so the plugin extends Simple JWT instead of reimplementing token behavior. The custom serializer calls the base token validation flow, then shapes the response so the frontend receives the refresh token, access token, and extra user information such as `username`.

That is useful because many frontends need more than a bare token pair after login. A UI often wants to immediately know who logged in, what username to display, or what user metadata should be cached after authentication.

## Registration flow

Registration is implemented as a custom `register` action on a DRF `GenericViewSet`. It accepts public requests with `AllowAny`, validates incoming user data, creates the user, hashes the password with Django's password system, and returns the serialized user data.

The important detail is that the password is not stored directly. The serializer creates the user object, calls Django's password hashing method, then saves the user. That keeps the implementation aligned with Django's authentication model instead of manually handling password storage.

## How to use it in a Django project

The repository README describes a copy-in approach:

1. Clone the repository beside your existing Django apps.
2. Install the requirements.
3. Add `authplugin.authentication` to `INSTALLED_APPS`.
4. Configure DRF to use Simple JWT authentication.
5. Include the plugin URLs from the main project `urls.py`.
6. Run migrations.

The interesting part is the final recommendation: remove the cloned `.git` folder and commit the authentication app into your main project. That makes this repository feel less like a packaged dependency and more like a reusable starter module. For early-stage projects, that can be a practical tradeoff because authentication almost always needs project-specific rules.

## Why this design is useful

This pattern keeps the authentication surface area small:

- Simple JWT owns token creation and refresh behavior.
- DRF owns routing, serializers, viewsets, and responses.
- The plugin owns project-specific response shape and registration behavior.

That separation is a good starting point. It avoids building a custom JWT implementation, while still giving the application control over the API contract exposed to the frontend.

It also makes customization straightforward. If the frontend needs `email`, `first_name`, roles, permissions, or profile data in the login response, the custom token serializer is the obvious place to add it. If registration needs email verification, invite codes, or default inactive users, the registration serializer and viewset are the places to evolve.

## What I would improve next

The repository is intentionally small, but there are a few improvements that would make it safer and easier to reuse:

- Return serializer validation errors during registration instead of collapsing every invalid request into a generic "user already exists" response.
- Decide server-side whether new users should be active instead of trusting `is_active` from the public request body.
- Add tests for login, token refresh, duplicate registration, invalid registration payloads, and password hashing.
- Add example project settings so installation is easier to verify.
- Consider packaging it as a proper reusable Django app if the goal becomes external reuse instead of copy-in customization.

## Takeaway

This repository is a compact authentication starter for Django REST Framework projects. Its strongest idea is not complexity; it is composition. It uses Simple JWT for the token mechanics, DRF for the API layer, and a small amount of custom code to make the authentication responses fit a real application.

For a project that needs JWT authentication quickly but still expects to customize user registration and login responses, this is a clean foundation.
