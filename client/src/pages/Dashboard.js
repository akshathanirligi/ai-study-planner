import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [subject, setSubject] = useState("");
    const [studyNotes, setStudyNotes] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [studyHours, setStudyHours] = useState(1);
    const [darkMode, setDarkMode] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await axios.get("https://ai-study-planner-1-9uvs.onrender.com/api/study");
            setTasks(res.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const addTask = async () => {
        try {
            await axios.post("https://ai-study-planner-1-9uvs.onrender.com/api/study", {
                subject,
                studyNotes,
                priority,
                studyHours
            });
            fetchTasks();
            setSubject("");
            setStudyNotes("");
            setPriority("Medium");
            setStudyHours(1);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className={darkMode ? "container dark" : "container light"}>
            <h1>AI Study Planner</h1>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <textarea
                    placeholder="Study Notes"
                    value={studyNotes}
                    onChange={(e) => setStudyNotes(e.target.value)}
                />
                <button onClick={addTask}>Add Study Task</button>
            </div>
        </div>
    );
}

export default Dashboard;
