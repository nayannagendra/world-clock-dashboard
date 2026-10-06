export default function DigitalClock({ date, is24Hour, showSeconds }) {
  const time = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    ...(showSeconds ? { second: "2-digit" } : {}),
    hour12: !is24Hour
  }).format(date);

  const meridiem = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    hour12: true
  }).formatToParts(date).find((part) => part.type === "dayPeriod")?.value;

  return (
    <div className="panel digital-panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">CURRENT TIME</p>
          <h2>Digital Clock</h2>
        </div>
        <span className="timezone-label">Local</span>
      </div>

      <div className="digital-time">
        {time}
      </div>

      <div className="digital-meta">
        <span>India Standard Time</span>
        {!is24Hour && <span className="ampm">{meridiem?.toUpperCase()}</span>}
      </div>

      <div className="digital-info">
        <div>
          <span>STATUS</span>
          <strong><i /> Synchronised</strong>
        </div>
        <div>
          <span>UPDATE</span>
          <strong>Every 1 second</strong>
        </div>
      </div>
    </div>
  );
}