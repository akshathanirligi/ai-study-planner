import React, { useEffect, useState } from "react";
import axios from "axios";
import {
   PieChart, Pie, Cell, Tooltip, Legend
} from "recharts";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [darkMode, setDarkMode] = useState(true);

    const completedCount = completedTasks.length;
    const totalTasks = tasks.length;
    const pendingTasks = totalTasks - completedCount;

    const chartData = [
        { name: "Completed", value: completedCount },
        { name: "Pending", value: pendingTasks }
    ];
    const COLORS = ["#22c55e", "#ef4444"];

    return (
        <div className={darkMode ? "container dark" : "container light"}>
            <div className="chart-container">
                <h2>Study Progress Chart</h2>
                <PieChart width={350} height={300}>
                    <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
}

export default Dashboard;
