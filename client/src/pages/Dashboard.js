import React, { useState, useEffect } from "react";

function Dashboard() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                        setIsActive(false);
                        const alarm = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
                        alarm.play();
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, minutes]);

    return (
        <div className="timer-section">
            <h2>Pomodoro Timer</h2>
            <div className="timer-display">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <div className="timer-buttons">
                <button onClick={() => setIsActive(!isActive)}>
                    {isActive ? "Pause" : "Start"}
                </button>
                <button onClick={() => { setMinutes(25); setSeconds(0); setIsActive(false); }}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
