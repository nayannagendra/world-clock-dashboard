import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import AnalogClock from "./components/AnalogClock";
import DigitalClock from "./components/DigitalClock";
import TimeZonePanel from "./components/TimeZonePanel";
import AlarmPanel from "./components/AlarmPanel";
import Controls from "./components/Controls";

const DEFAULT_ZONES = [
  { id: "india", city: "New Delhi", country: "India", zone: "Asia/Kolkata", flag: "🇮🇳" },
  { id: "london", city: "London", country: "United Kingdom", zone: "Europe/London", flag: "🇬🇧" },
  { id: "new-york", city: "New York", country: "United States", zone: "America/New_York", flag: "🇺🇸" },
  { id: "dubai", city: "Dubai", country: "United Arab Emirates", zone: "Asia/Dubai", flag: "🇦🇪" },
  { id: "tokyo", city: "Tokyo", country: "Japan", zone: "Asia/Tokyo", flag: "🇯🇵" },
  { id: "sydney", city: "Sydney", country: "Australia", zone: "Australia/Sydney", flag: "🇦🇺" }
];

function getStored(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [now, setNow] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [zones, setZones] = useState(() => getStored("clock-zones", DEFAULT_ZONES));
  const [alarms, setAlarms] = useState(() => getStored("clock-alarms", []));
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("clock-zones", JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    localStorage.setItem("clock-alarms", JSON.stringify(alarms));
  }, [alarms]);

  const dateText = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(now),
    [now]
  );

  function addZone(zone) {
    if (!zones.some((item) => item.zone === zone.zone)) {
      setZones((current) => [...current, zone]);
    }
  }

  function removeZone(id) {
    setZones((current) => current.filter((zone) => zone.id !== id));
  }

  function addAlarm(alarm) {
    setAlarms((current) => [
      ...current,
      { ...alarm, id: crypto.randomUUID(), enabled: true }
    ]);
  }

  function toggleAlarm(id) {
    setAlarms((current) =>
      current.map((alarm) =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );
  }

  function deleteAlarm(id) {
    setAlarms((current) => current.filter((alarm) => alarm.id !== id));
  }

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Header
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((value) => !value)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="container">
        {activeTab === "dashboard" && (
          <>
            <section className="hero-grid">
              <div className="hero-copy">
                <p className="eyebrow">REAL-TIME CLOCK SYSTEM</p>
                <h1>World Clock <span>Dashboard</span></h1>
                <p className="subtitle">
                  Track your local time, explore global time zones and manage
                  alarms from one responsive dashboard.
                </p>
                <div className="live-pill">
                  <span className="live-dot" />
                  Live • Updates every second
                </div>
              </div>

              <div className="hero-date">
                <span>Today</span>
                <strong>{dateText}</strong>
                <small>Local timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</small>
              </div>
            </section>

            <section className="clock-grid">
              <AnalogClock date={now} />
              <DigitalClock
                date={now}
                is24Hour={is24Hour}
                showSeconds={showSeconds}
              />
            </section>

            <section className="content-grid">
              <TimeZonePanel
                now={now}
                zones={zones}
                onAddZone={addZone}
                onRemoveZone={removeZone}
                is24Hour={is24Hour}
                showSeconds={showSeconds}
              />
              <AlarmPanel
                now={now}
                alarms={alarms}
                onAdd={addAlarm}
                onToggle={toggleAlarm}
                onDelete={deleteAlarm}
              />
            </section>

            <Controls
              is24Hour={is24Hour}
              setIs24Hour={setIs24Hour}
              showSeconds={showSeconds}
              setShowSeconds={setShowSeconds}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              zoneCount={zones.length}
              alarmCount={alarms.filter((alarm) => alarm.enabled).length}
            />
          </>
        )}

        {activeTab === "timezones" && (
          <section className="page-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">GLOBAL TIME</p>
                <h2>Time Zone Management</h2>
              </div>
              <span className="count-badge">{zones.length} zones</span>
            </div>
            <TimeZonePanel
              now={now}
              zones={zones}
              onAddZone={addZone}
              onRemoveZone={removeZone}
              is24Hour={is24Hour}
              showSeconds={showSeconds}
            />
          </section>
        )}

        {activeTab === "alarms" && (
          <section className="page-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">SCHEDULE</p>
                <h2>Alarm Manager</h2>
              </div>
              <span className="count-badge">
                {alarms.filter((alarm) => alarm.enabled).length} active
              </span>
            </div>
            <AlarmPanel
              now={now}
              alarms={alarms}
              onAdd={addAlarm}
              onToggle={toggleAlarm}
              onDelete={deleteAlarm}
            />
          </section>
        )}
      </main>

      <footer className="footer">
        <span>World Clock Dashboard</span>
        <span>Built with React • Responsive • Real-time</span>
      </footer>
    </div>
  );
}