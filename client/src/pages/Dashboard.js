import React, { useState } from "react";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const completedCount = completedTasks.length;
    const totalTasks = tasks.length;
    const pendingTasks = totalTasks - completedCount;
    const streak = completedCount * 2 + 1;

    return (
        <div>
            <div className="streak-container">
                🔥 Study Streak: <span>{streak} Days</span>
            </div>
            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Tasks</h3>
                    <p>{totalTasks}</p>
                </div>
                <div className="stat-card">
                    <h3>Completed</h3>
                    <p>{completedCount}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending</h3>
                    <p>{pendingTasks}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
