import { useEffect, useRef, useState } from "react";

function playAlarmSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.value = 0.08;

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
      context.close();
    }, 700);
  } catch {
    // Audio can be blocked by the browser until the user interacts with the page.
  }
}

export default function AlarmPanel({ now, alarms, onAdd, onToggle, onDelete }) {
  const [time, setTime] = useState("07:00");
  const [label, setLabel] = useState("Morning");
  const [showForm, setShowForm] = useState(false);
  const lastTriggered = useRef("");

  useEffect(() => {
    const current = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    alarms.forEach((alarm) => {
      const key = `${alarm.id}-${now.toDateString()}-${current}`;
      if (alarm.enabled && alarm.time === current && lastTriggered.current !== key) {
        lastTriggered.current = key;
        playAlarmSound();
        window.setTimeout(() => {
          window.alert(`Alarm: ${alarm.label || "Time to check your clock!"}`);
        }, 50);
      }
    });
  }, [now, alarms]);

  function submit(event) {
    event.preventDefault();
    onAdd({ time, label: label.trim() || "Alarm" });
    setLabel("Morning");
    setTime("07:00");
    setShowForm(false);
  }

  return (
    <div className="panel alarm-panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">SCHEDULE</p>
          <h2>Alarms</h2>
        </div>
        <button className="outline-button" onClick={() => setShowForm((value) => !value)}>
          + Add Alarm
        </button>
      </div>

      {showForm && (
        <form className="alarm-form" onSubmit={submit}>
          <label>
            Time
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </label>
          <label>
            Label
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Study"
              maxLength={30}
            />
          </label>
          <button className="primary-button" type="submit">Save Alarm</button>
        </form>
      )}

      {alarms.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⏰</div>
          <strong>No alarms yet</strong>
          <span>Create an alarm to test the scheduler.</span>
        </div>
      ) : (
        <div className="alarm-list">
          {alarms.map((alarm) => (
            <div className={`alarm-card ${alarm.enabled ? "enabled" : "disabled"}`} key={alarm.id}>
              <div>
                <strong>{alarm.time}</strong>
                <span>{alarm.label}</span>
              </div>
              <div className="alarm-actions">
                <button
                  className={`switch ${alarm.enabled ? "on" : ""}`}
                  onClick={() => onToggle(alarm.id)}
                  aria-label={`Turn alarm ${alarm.enabled ? "off" : "on"}`}
                >
                  <span />
                </button>
                <button className="delete-button" onClick={() => onDelete(alarm.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}