import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [subject, setSubject] = useState("");
    const [studyNotes, setStudyNotes] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [studyHours, setStudyHours] = useState(1);
    const [editingTask, setEditingTask] = useState(null);
    const [deadline, setDeadline] = useState("");
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
            if (editingTask) {
                await axios.put(`https://ai-study-planner-1-9uvs.onrender.com/api/study/${editingTask}`, {
                    subject,
                    studyNotes,
                    priority,
                    studyHours,
                    deadline
                });
                setEditingTask(null);
            } else {
                await axios.post("https://ai-study-planner-1-9uvs.onrender.com/api/study", {
                    subject,
                    studyNotes,
                    priority,
                    studyHours,
                    deadline
                });
            }
            fetchTasks();
            setSubject("");
            setStudyNotes("");
            setPriority("Medium");
            setStudyHours(1);
            setDeadline("");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`https://ai-study-planner-1-9uvs.onrender.com/api/study/${id}`);
            fetchTasks();
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
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Study Hours"
                    value={studyHours}
                    onChange={(e) => setStudyHours(e.target.value)}
                />
                <button onClick={addTask}>Add Study Task</button>
            </div>
        </div>
    );
}

export default Dashboard;
