(function () {
  "use strict";

  var appName = (window.APP_CONFIG && window.APP_CONFIG.appName) || "Tend";
  document.title = appName;
  document.querySelectorAll("[data-app-name]").forEach(function (el) {
    el.textContent = appName;
  });

  // Today's date in the header, for example "Wed, 18 Nov 2026"
  var d = new Date();
  var parts = new Intl.DateTimeFormat("en-GB", {
    weekday: "short", day: "numeric", month: "short", year: "numeric"
  }).formatToParts(d).reduce(function (o, p) { o[p.type] = p.value; return o; }, {});
  document.getElementById("today").textContent =
    parts.weekday + ", " + parts.day + " " + parts.month + " " + parts.year;

  var PAGES = ["body", "mind", "reports", "settings"];

  function show() {
    var route = (location.hash || "").replace(/^#\/?/, "");
    var page = PAGES.indexOf(route) !== -1 ? route : "body";

    document.querySelectorAll(".page").forEach(function (el) {
      el.hidden = el.id !== "page-" + page;
    });

    document.querySelectorAll(".tab").forEach(function (el) {
      if (el.dataset.tab === page) {
        el.setAttribute("aria-current", "page");
      } else {
        el.removeAttribute("aria-current");
      }
    });

    window.scrollTo(0, 0);
    var heading = document.querySelector("#page-" + page + " h1");
    if (heading) heading.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", show);
  show();
})();
