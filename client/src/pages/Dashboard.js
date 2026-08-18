import React, { useState } from "react";

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    return (
        <div className="task-container">
            {tasks.map((task) => (
                <div className="task-card" key={task._id}>
                    <h2>{task.subject}</h2>
                    {task.deadline && new Date(task.deadline).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000 && (
                        <p className="deadline-warning">⚠️ Deadline approaching!</p>
                    )}
                    <p className="ai-tip">
                        {task.priority === "High"
                            ? " Focus deeply and revise this subject twice today."
                            : task.priority === "Medium"
                            ? "📘 Practice consistently for better retention."
                            : " Light revision is enough for today."}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
