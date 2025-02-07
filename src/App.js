import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  // Apply dark mode class to the body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode-body");
    } else {
      document.body.classList.remove("dark-mode-body");
    }
  }, [darkMode]);

  return (
    <div className="stopwatch-container">
      {/* Dark Mode Toggle Switch */}
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <span className="slider"></span>
      </label>

      <h1 className="title">Stopwatch</h1>

      <div className="timer-display">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      <div className="buttons">
        {running ? (
          <button className="stop-btn" onClick={() => setRunning(false)}>Stop</button>
        ) : (
          <button className="start-btn" onClick={() => setRunning(true)}>Start</button>
        )}
        <button className="reset-btn" onClick={() => setTime(0)}>Reset</button>
      </div>
    </div>
  );
}

export default App;
