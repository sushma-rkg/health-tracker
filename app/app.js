(function () {
  "use strict";

  var appName = (window.APP_CONFIG && window.APP_CONFIG.appName) || "Tend";
  document.title = appName;
  document.querySelectorAll("[data-app-name]").forEach(function (el) {
    el.textContent = appName;
  });

  // Today's date in the header, for example "Wed, 18 Nov 2026"
  var parts = new Intl.DateTimeFormat("en-GB", {
    weekday: "short", day: "numeric", month: "short", year: "numeric"
  }).formatToParts(new Date()).reduce(function (o, p) { o[p.type] = p.value; return o; }, {});
  document.getElementById("today").textContent =
    parts.weekday + ", " + parts.day + " " + parts.month + " " + parts.year;

  var $ = function (id) { return document.getElementById(id); };
  var boot = $("boot"), loginView = $("login-view"), appView = $("app-view");
  var form = $("login-form"), emailEl = $("email"), passwordEl = $("password");
  var loginBtn = $("login-btn"), loginMsg = $("login-msg");
  var logoutBtn = $("logout-btn"), logoutMsg = $("logout-msg");

  // ---------- Which screen is showing ----------
  function setView(name) {
    boot.hidden = name !== "boot";
    loginView.hidden = name !== "login";
    appView.hidden = name !== "app";
  }

  function say(el, text) {
    el.textContent = text || "";
    el.hidden = !text;
  }

  // ---------- Pages inside the app ----------
  var PAGES = ["body", "mind", "reports", "settings"];

  function showPage() {
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

  window.addEventListener("hashchange", function () {
    if (!appView.hidden) showPage();
  });

  // ---------- Login and logout ----------
  var env = window.APP_ENV || {};
  var client = null;
  if (env.supabaseUrl && env.supabaseKey && window.supabase) {
    // The public key only. The session is kept on this device until I log out.
    client = window.supabase.createClient(env.supabaseUrl, env.supabaseKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });
  }

  function showLogin() {
    form.reset();
    say(loginMsg, "");
    say(logoutMsg, "");
    loginBtn.disabled = false;
    loginBtn.textContent = "Log in";
    loginBtn.removeAttribute("aria-busy");
    // Forget which page was open, so nothing is revealed before the next login
    history.replaceState(null, "", location.pathname + location.search);
    setView("login");
  }

  function showApp(freshLogin) {
    if (freshLogin) {
      history.replaceState(null, "", location.pathname + location.search + "#/body");
    }
    setView("app");
    showPage();
  }

  if (!client) {
    showLogin();
    say(loginMsg, "This app is not set up yet. Please try again later.");
    loginBtn.disabled = true;
  } else {
    // Signing out anywhere (this tab or another) brings back the login screen
    client.auth.onAuthStateChange(function (event) {
      if (event === "SIGNED_OUT") showLogin();
    });

    client.auth.getSession().then(function (result) {
      if (result.data && result.data.session) {
        showApp(false);
        // Quietly check the account still exists. Only a clear "no" logs me out.
        client.auth.getUser().then(function (r) {
          var s = r.error && r.error.status;
          if (r.error && (s === 401 || s === 403 || r.error.name === "AuthSessionMissingError")) {
            client.auth.signOut({ scope: "local" });
          }
        });
      } else {
        showLogin();
      }
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!client) return;

    var email = emailEl.value.trim();
    var password = passwordEl.value;
    if (!email || !password) {
      say(loginMsg, "Please fill in your email and password.");
      return;
    }

    say(loginMsg, "");
    loginBtn.disabled = true;
    loginBtn.setAttribute("aria-busy", "true");
    loginBtn.textContent = "Logging in…";

    client.auth.signInWithPassword({ email: email, password: password }).then(function (result) {
      if (result.error) {
        var offline = !result.error.status || result.error.status >= 500;
        say(loginMsg, offline
          ? "We could not reach the server. Please check your internet and try again."
          : "That did not work. Please check your email and password.");
        loginBtn.disabled = false;
        loginBtn.removeAttribute("aria-busy");
        loginBtn.textContent = "Log in";
        return;
      }
      passwordEl.value = "";
      showApp(true);
    }).catch(function () {
      say(loginMsg, "We could not reach the server. Please check your internet and try again.");
      loginBtn.disabled = false;
      loginBtn.removeAttribute("aria-busy");
      loginBtn.textContent = "Log in";
    });
  });

  logoutBtn.addEventListener("click", function () {
    if (!client) return;
    say(logoutMsg, "");
    logoutBtn.disabled = true;
    logoutBtn.textContent = "Logging out…";
    client.auth.signOut({ scope: "local" }).then(function (result) {
      logoutBtn.disabled = false;
      logoutBtn.textContent = "Log out";
      if (result.error) {
        say(logoutMsg, "We could not log you out just now. Please try again.");
      }
      // On success the SIGNED_OUT event shows the login screen.
    });
  });
})();
