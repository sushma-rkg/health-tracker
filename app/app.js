(function () {
  "use strict";

  var appName = (window.APP_CONFIG && window.APP_CONFIG.appName) || "Health Tracker";
  document.title = appName;
  document.querySelectorAll("[data-app-name]").forEach(function (el) {
    el.textContent = appName;
  });

  var TABS = ["body", "mind", "reports"];
  var lastTab = "body";

  var back = document.getElementById("back");
  var topbarName = document.getElementById("topbar-name");
  var settingsLink = document.getElementById("settings-link");

  // Today's date for the Body page header
  document.getElementById("today-date").textContent =
    new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  function show() {
    var route = (location.hash || "").replace(/^#\/?/, "");
    var isSettings = route === "settings";
    var page = isSettings || TABS.indexOf(route) !== -1 ? route : "body";

    if (!isSettings) lastTab = page;

    document.querySelectorAll(".page").forEach(function (el) {
      el.hidden = el.id !== "page-" + page;
    });

    document.querySelectorAll(".tab").forEach(function (el) {
      if (!isSettings && el.dataset.tab === page) {
        el.setAttribute("aria-current", "page");
      } else {
        el.removeAttribute("aria-current");
      }
    });

    // Settings shows a back button; other pages show the app name (phone only)
    back.hidden = !isSettings;
    back.setAttribute("href", "#/" + lastTab);
    topbarName.hidden = isSettings;
    if (isSettings) {
      settingsLink.setAttribute("aria-current", "page");
    } else {
      settingsLink.removeAttribute("aria-current");
    }

    window.scrollTo(0, 0);
    var heading = document.querySelector("#page-" + page + " h1");
    if (heading) heading.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", show);
  show();
})();
