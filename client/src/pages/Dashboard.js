import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={darkMode ? "container dark" : "container light"}>
            <h1>AI Study Planner</h1>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
        </div>
    );
}

export default Dashboard;
