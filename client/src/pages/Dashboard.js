import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function Dashboard() {
    const weeklyData = [
        { day: "Mon", hours: 2 },
        { day: "Tue", hours: 4 },
        { day: "Wed", hours: 3 },
        { day: "Thu", hours: 5 },
        { day: "Fri", hours: 2 },
        { day: "Sat", hours: 6 },
        { day: "Sun", hours: 4 }
    ];

    return (
        <div className="weekly-chart">
            <h2>📈 Weekly Study Analytics</h2>
            <LineChart width={700} height={300} data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="hours" stroke="#38bdf8" strokeWidth={4} />
            </LineChart>
        </div>
    );
}

export default Dashboard;
