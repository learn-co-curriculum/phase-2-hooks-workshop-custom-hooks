import { useState, useEffect } from "react";

// checks if the user is idle or not based on these event types
const activityEvents = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
];

export function useIdle(ms, eventTypes = activityEvents) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let interval = setTimeout(() => setIsIdle(true), ms);

    function setActive() {
      setIsIdle(false);
      clearTimeout(interval);
      interval = setTimeout(() => setIsIdle(true), ms);
    }

    for (const type of eventTypes) {
      window.addEventListener(type, setActive);
    }

    return function cleanup() {
      for (const type of eventTypes) {
        window.removeEventListener(type, setActive);
      }
      clearTimeout(interval);
    };
  }, [ms, eventTypes]);

  return isIdle;
}

export default function Idle() {
  const isIdle = useIdle(3000);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>useIdle Demo</h2>
      <h3>
        {isIdle ? (
          <span role="img" aria-label="idle">
            Idle 😴
          </span>
        ) : (
          <span role="img" aria-label="active">
            Active 🤠
          </span>
        )}
      </h3>
    </div>
  );
}
