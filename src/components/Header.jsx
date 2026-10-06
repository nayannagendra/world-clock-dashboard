export default function Header({
  darkMode,
  onToggleTheme,
  activeTab,
  setActiveTab
}) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">◷</div>
        <div>
          <strong>WorldClock</strong>
          <span>Dashboard</span>
        </div>
      </div>

      <nav className="nav">
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={activeTab === "timezones" ? "active" : ""}
          onClick={() => setActiveTab("timezones")}
        >
          Time Zones
        </button>
        <button
          className={activeTab === "alarms" ? "active" : ""}
          onClick={() => setActiveTab("alarms")}
        >
          Alarms
        </button>
      </nav>

      <button className="theme-button" onClick={onToggleTheme} aria-label="Toggle theme">
        {darkMode ? "☀" : "☾"}
        <span>{darkMode ? "Light" : "Dark"}</span>
      </button>
    </header>
  );
}