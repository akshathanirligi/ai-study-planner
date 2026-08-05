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
            <div className="task-container">
                {tasks.map((task) => (
                    <div className="task-card" key={task._id}>
                        <h2>{task.subject}</h2>
                        <p>{task.studyNotes}</p>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
