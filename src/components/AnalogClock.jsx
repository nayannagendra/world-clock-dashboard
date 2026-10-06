export default function AnalogClock({ date }) {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours() % 12;

  // Calculate hand rotations
  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="panel analog-panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">LOCAL TIME</p>
          <h2>Analog Clock</h2>
        </div>

        <span className="status-dot">LIVE</span>
      </div>

      <div className="analog-clock">
        <div className="clock-face">

          {/* Clock Numbers */}
          {[...Array(12)].map((_, index) => {
            const number = index + 1;
            const angle = number * 30;

            return (
              <span
                key={number}
                className={`clock-number number-${number}`}
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <b
                  style={{
                    transform: `rotate(${-angle}deg)`,
                  }}
                >
                  {number}
                </b>
              </span>
            );
          })}

          {/* Hour Hand */}
          <span
            className="hand hour-hand"
            style={{
              transform: `rotate(${hourDeg}deg)`,
            }}
          />

          {/* Minute Hand */}
          <span
            className="hand minute-hand"
            style={{
              transform: `rotate(${minuteDeg}deg)`,
            }}
          />

          {/* Second Hand */}
          <span
            className="hand second-hand"
            style={{
              transform: `rotate(${secondDeg}deg)`,
            }}
          />

          {/* Center Point */}
          <span className="clock-center" />

        </div>
      </div>
    </div>
  );
}