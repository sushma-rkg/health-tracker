import { useEffect } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { APP_NAME } from "./config.js";

const TABS = [
  { path: "/body", label: "Body", icon: "🫀" },
  { path: "/mind", label: "Mind", icon: "🧠" },
  { path: "/reports", label: "Reports", icon: "📄" },
];

function Placeholder({ title }) {
  return (
    <section className="page">
      <h1>{title}</h1>
      <p>Coming soon</p>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    document.title = APP_NAME;
  }, []);

  return (
    <div className="shell">
      <header className="topbar">
        <span className="app-name">{APP_NAME}</span>
        <NavLink to="/settings" className="settings-btn" aria-label="Settings">
          ⚙️
        </NavLink>
      </header>

      <nav className="tabs" aria-label="Main">
        {TABS.map((t) => (
          <NavLink key={t.path} to={t.path} className="tab">
            <span className="tab-icon" aria-hidden="true">{t.icon}</span>
            <span>{t.label}</span>
          </NavLink>
        ))}
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/body" replace />} />
          {TABS.map((t) => (
            <Route key={t.path} path={t.path} element={<Placeholder title={t.label} />} />
          ))}
          <Route path="/settings" element={<Placeholder title="Settings" />} />
          <Route path="*" element={<Navigate to="/body" replace />} />
        </Routes>
      </main>
    </div>
  );
}
