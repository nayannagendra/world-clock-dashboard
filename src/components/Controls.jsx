export default function Controls({
  is24Hour,
  setIs24Hour,
  showSeconds,
  setShowSeconds,
  darkMode,
  setDarkMode,
  zoneCount,
  alarmCount
}) {
  return (
    <section className="controls-section">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">CUSTOMISE</p>
          <h2>Dashboard Controls</h2>
        </div>
      </div>

      <div className="controls-grid">
        <button className="control-card" onClick={() => setIs24Hour((value) => !value)}>
          <span className="control-icon">◷</span>
          <span>
            <strong>Time Format</strong>
            <small>{is24Hour ? "24-hour format" : "12-hour format"}</small>
          </span>
          <b>{is24Hour ? "24H" : "12H"}</b>
        </button>

        <button className="control-card" onClick={() => setShowSeconds((value) => !value)}>
          <span className="control-icon">⌁</span>
          <span>
            <strong>Seconds</strong>
            <small>{showSeconds ? "Seconds visible" : "Seconds hidden"}</small>
          </span>
          <b>{showSeconds ? "ON" : "OFF"}</b>
        </button>

        <button className="control-card" onClick={() => setDarkMode((value) => !value)}>
          <span className="control-icon">{darkMode ? "☀" : "☾"}</span>
          <span>
            <strong>Appearance</strong>
            <small>{darkMode ? "Dark interface" : "Light interface"}</small>
          </span>
          <b>{darkMode ? "DARK" : "LIGHT"}</b>
        </button>

        <div className="control-card static-card">
          <span className="control-icon">◎</span>
          <span>
            <strong>System Status</strong>
            <small>{zoneCount} cities • {alarmCount} active alarms</small>
          </span>
          <b className="online">ONLINE</b>
        </div>
      </div>
    </section>
  );
}