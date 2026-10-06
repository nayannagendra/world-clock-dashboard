import { useState } from "react";

const AVAILABLE_ZONES = [
  { id: "india", city: "New Delhi", country: "India", zone: "Asia/Kolkata", flag: "🇮🇳" },
  { id: "london", city: "London", country: "United Kingdom", zone: "Europe/London", flag: "🇬🇧" },
  { id: "new-york", city: "New York", country: "United States", zone: "America/New_York", flag: "🇺🇸" },
  { id: "los-angeles", city: "Los Angeles", country: "United States", zone: "America/Los_Angeles", flag: "🇺🇸" },
  { id: "dubai", city: "Dubai", country: "United Arab Emirates", zone: "Asia/Dubai", flag: "🇦🇪" },
  { id: "tokyo", city: "Tokyo", country: "Japan", zone: "Asia/Tokyo", flag: "🇯🇵" },
  { id: "singapore", city: "Singapore", country: "Singapore", zone: "Asia/Singapore", flag: "🇸🇬" },
  { id: "sydney", city: "Sydney", country: "Australia", zone: "Australia/Sydney", flag: "🇦🇺" },
  { id: "paris", city: "Paris", country: "France", zone: "Europe/Paris", flag: "🇫🇷" }
];

function formatTime(date, zone, is24Hour, showSeconds) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    ...(showSeconds ? { second: "2-digit" } : {}),
    hour12: !is24Hour
  }).format(date);
}

function getOffset(date, zone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    timeZoneName: "shortOffset"
  }).formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value || "GMT";
}

export default function TimeZonePanel({
  now,
  zones,
  onAddZone,
  onRemoveZone,
  is24Hour,
  showSeconds
}) {
  const [showAdd, setShowAdd] = useState(false);

  const available = AVAILABLE_ZONES.filter(
    (item) => !zones.some((zone) => zone.zone === item.zone)
  );

  return (
    <div className="panel timezone-panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">GLOBAL</p>
          <h2>Time Zones</h2>
        </div>
        <button className="outline-button" onClick={() => setShowAdd((value) => !value)}>
          + Add City
        </button>
      </div>

      {showAdd && (
        <div className="add-zone-box">
          <strong>Select a city</strong>
          <div className="zone-options">
            {available.length === 0 && <span className="muted">All available cities are already added.</span>}
            {available.map((zone) => (
              <button
                key={zone.id}
                onClick={() => {
                  onAddZone(zone);
                  setShowAdd(false);
                }}
              >
                {zone.flag} {zone.city}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="zone-list">
        {zones.map((zone) => (
          <div className="zone-card" key={zone.id}>
            <div className="zone-left">
              <div className="flag">{zone.flag}</div>
              <div>
                <strong>{zone.city}</strong>
                <span>{zone.country}</span>
              </div>
            </div>

            <div className="zone-time">
              <strong>{formatTime(now, zone.zone, is24Hour, showSeconds)}</strong>
              <span>{getOffset(now, zone.zone)}</span>
            </div>

            <button
              className="remove-button"
              title={`Remove ${zone.city}`}
              onClick={() => onRemoveZone(zone.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}