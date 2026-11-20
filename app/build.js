// Runs when the app is published on Vercel (and for local tests).
// Reads the two Supabase settings from the environment and writes app/env.js.
// It refuses to continue if the settings look wrong, and above all if the SECRET key was used by mistake.
// It never prints the key.
"use strict";
const fs = require("fs");
const path = require("path");

function fail(message) {
  console.error("\nSETTINGS PROBLEM: " + message + "\n");
  process.exit(1);
}

const url = (process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "");
const key = (process.env.SUPABASE_PUBLISHABLE_KEY || "").trim();

if (!url || !key) {
  fail("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must both be set (in Vercel: Settings, then Environment Variables).");
}
if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)) {
  fail("SUPABASE_URL should look like https://your-project-id.supabase.co");
}

if (/^sb_secret_/i.test(key)) {
  fail("That is the SECRET key. It must never be used in the app. Use the publishable (public) key instead.");
}
if (!/^sb_publishable_/i.test(key)) {
  // Older style keys are signed tokens. Only the "anon" one is allowed.
  const parts = key.split(".");
  let role = null;
  if (parts.length === 3) {
    try {
      role = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")).role;
    } catch (e) { /* not a token */ }
  }
  if (role === "service_role") {
    fail("That is the SECRET (service_role) key. It must never be used in the app. Use the publishable (public) key instead.");
  }
  if (role !== "anon") {
    fail("SUPABASE_PUBLISHABLE_KEY does not look like a publishable (public) key.");
  }
}

const out = "window.APP_ENV = " + JSON.stringify({ supabaseUrl: url, supabaseKey: key }) + ";\n";
fs.writeFileSync(path.join(__dirname, "env.js"), out);
console.log("Settings file written (values not shown).");
