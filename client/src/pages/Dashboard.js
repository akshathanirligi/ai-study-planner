import React, { useEffect, useState } from "react";
import axios from "axios";
import {
   PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [darkMode, setDarkMode] = useState(true);

    const completedCount = completedTasks.length;
    const totalTasks = tasks.length;
    const pendingTasks = totalTasks - completedCount;

    return (
        <div className={darkMode ? "container dark" : "container light"}>
            <h1>AI Study Planner</h1>
        </div>
    );
}

export default Dashboard;
