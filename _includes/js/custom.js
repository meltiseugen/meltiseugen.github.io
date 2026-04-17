(function () {
  var themes = [
    "maker",
    "terminal",
    "portfolio",
    "editorial"
  ];

  function initThemeSwitcher() {
    var select = document.getElementById("theme-select");

    function applyTheme(theme) {
      var nextTheme = themes.indexOf(theme) === -1 ? "maker" : theme;
      document.documentElement.setAttribute("data-site-theme", nextTheme);
      try {
        localStorage.setItem("site-theme", nextTheme);
      } catch (error) {
        return;
      }
    }

    if (!select) {
      return;
    }

    select.value = document.documentElement.getAttribute("data-site-theme") || "maker";
    select.addEventListener("change", function (event) {
      applyTheme(event.target.value);
    });
  }

  if (window.jtd && window.jtd.onReady) {
    window.jtd.onReady(initThemeSwitcher);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeSwitcher);
  } else {
    initThemeSwitcher();
  }
})();
