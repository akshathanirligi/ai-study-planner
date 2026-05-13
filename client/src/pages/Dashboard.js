import React, { useEffect, useState } from "react";
import axios from "axios";

import {
   PieChart,
Pie,
Cell,
Tooltip,
Legend,
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid

} from "recharts";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [subject, setSubject] = useState("");

    const [studyNotes, setStudyNotes] = useState("");

    const [priority, setPriority] = useState("Medium");

    const [studyHours, setStudyHours] = useState(1);

    const [completedTasks, setCompletedTasks] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [editingTask, setEditingTask] = useState(null);

    const [deadline, setDeadline] = useState("");

    const [darkMode, setDarkMode] = useState(true);

    const [minutes, setMinutes] = useState(0);

    const [seconds, setSeconds] = useState(10);

    const [isActive, setIsActive] = useState(false);

    const [question, setQuestion] = useState("");

const [answer, setAnswer] = useState("");

const emojis = [
    "🎯",
    "📚",
    "🚀",
    "🔥",
    "🎮",
    "💡"
];

const gameCards = [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5);

const [flippedCards, setFlippedCards] =
    useState([]);

const [matchedCards, setMatchedCards] =
    useState([]);


    // FETCH TASKS
    const fetchTasks = async () => {

        try {

            const res = await axios.get(
                "http://127.0.0.1:5000/api/study"
            );

            setTasks(res.data);

        } catch (error) {

            console.log(error.response?.data || error.message);
        }
    };


    // ADD TASK
      const addTask = async () => {

    try {

        if (editingTask) {

            await axios.put(
                `http://127.0.0.1:5000/api/study/${editingTask}`,
                {
                    subject,
                    studyNotes,
                    priority,
                    studyHours,
                    deadline
                }
            );

            setEditingTask(null);

        } else {

            await axios.post(
                "http://127.0.0.1:5000/api/study",
                {
                    subject,
                    studyNotes,
                    priority,
                    studyHours,
                    deadline
                }
            );
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
           

    // DELETE TASK
    const deleteTask = async (id) => {

        try {

            await axios.delete(
                `http://127.0.0.1:5000/api/study/${id}`
            );

            fetchTasks();

        } catch (error) {

            console.log(error.response?.data || error.message);
        }
    };


    // PROGRESS CALCULATION
    const completedCount = completedTasks.length;

    const totalTasks = tasks.length;

    const pendingTasks =
    totalTasks - completedCount;

   const flipCard = (index) => {

    if (
        flippedCards.length === 2 ||
        flippedCards.includes(index)
    ) {
        return;
    }

    const newFlipped = [
        ...flippedCards,
        index
    ];

    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {

        const first =
            gameCards[newFlipped[0]];

        const second =
            gameCards[newFlipped[1]];

        if (first === second) {

            setMatchedCards([
                ...matchedCards,
                first
            ]);
        }

        setTimeout(() => {
            setFlippedCards([]);
        }, 800);
    }
};

const askAI = () => {

    if (
        question.toLowerCase().includes("dbms")
    ) {

        setAnswer(
            "📘 Focus on normalization, SQL joins, and transactions."
        );

    } else if (
        question.toLowerCase().includes("ai")
    ) {

        setAnswer(
            "🤖 Revise machine learning algorithms and neural networks."
        );

    } else if (
        question.toLowerCase().includes("network")
    ) {

        setAnswer(
            "🌐 Practice OSI model, TCP/IP, and subnetting."
        );

    } else {

        setAnswer(
            "✨ Stay consistent and revise daily for better learning."
        );
    }
};

    const streak =
    completedCount * 2 + 1;

    const progress =
    totalTasks === 0
        ? 0
        : Math.round(
            (completedCount / totalTasks) * 100
        );

const chartData = [

    {
        name: "Completed",
        value: completedCount
    },

    {
        name: "Pending",
        value: pendingTasks
    }

];

const COLORS = [
    "#22c55e",
    "#ef4444"
];

const weeklyData = [

    {
        day: "Mon",
        hours: 2
    },

    {
        day: "Tue",
        hours: 4
    },

    {
        day: "Wed",
        hours: 3
    },

    {
        day: "Thu",
        hours: 5
    },

    {
        day: "Fri",
        hours: 2
    },

    {
        day: "Sat",
        hours: 6
    },

    {
        day: "Sun",
        hours: 4
    }

];

            useEffect(() => {

    let interval = null;

    if (isActive) {

        interval = setInterval(() => {

            if (seconds === 0) {

                if (minutes === 0) {

                    clearInterval(interval);

                    setIsActive(false);

const alarm = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
);

alarm.play();

                } else {

                    setMinutes(minutes - 1);

                    setSeconds(59);
                }

            } else {

                setSeconds(seconds - 1);
            }

        }, 1000);

    }

    return () => clearInterval(interval);

}, [isActive, seconds, minutes]);

    useEffect(() => {

        fetchTasks();

    }, []);


    return (

        <div className={darkMode ? "container dark" : "container light"}>

            <h1>AI Study Planner</h1>

            <button

    className="theme-toggle"
    onClick={() =>
        setDarkMode(!darkMode)
    }
>
    {darkMode
        ? "☀️ Light Mode"
        : "🌙 Dark Mode"}
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

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>

                <input
    type="date"
    value={deadline}
    onChange={(e) =>
        setDeadline(e.target.value)
    }
/>
                <input
                    type="number"
                    placeholder="Study Hours"
                    value={studyHours}
                    onChange={(e) => setStudyHours(e.target.value)}
                />

                <button onClick={addTask}>
                    Add Study Task
                </button>

            </div>

<input
    type="text"
    placeholder="Search Subjects..."
    value={searchTerm}
    onChange={(e) =>
        setSearchTerm(e.target.value)
    }
    className="search-bar"
/>

<div className="timer-section">

    <h2>Pomodoro Timer</h2>

    <div className="timer-display">

        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}

    </div>

    <div className="timer-buttons">

        <button
            onClick={() =>
                setIsActive(!isActive)
            }
        >
            {isActive ? "Pause" : "Start"}
        </button>

        <button
            onClick={() => {

                setMinutes(25);

                setSeconds(0);

                setIsActive(false);
            }}
        >
            Reset
        </button>

    </div>

</div>

<div className="game-container">

    <h2>🧩 Relaxation Memory Game</h2>

    <div className="game-grid">

        {gameCards.map((emoji, index) => (

            <div
                key={index}
                className={`game-card ${
                    flippedCards.includes(index) ||
                    matchedCards.includes(emoji)
                        ? "flipped"
                        : ""
                }`}
                onClick={() =>
                    flipCard(index)
                }
            >

                {flippedCards.includes(index) ||
                matchedCards.includes(emoji)
                    ? emoji
                    : "❓"}

            </div>

        ))}

    </div>

</div>

<div className="ai-chat-container">

    <h2>🤖 AI Study Assistant</h2>

    <input
        type="text"
        placeholder="Ask something..."
        value={question}
        onChange={(e) =>
            setQuestion(e.target.value)
        }
    />

    <button onClick={askAI}>
        Ask AI
    </button>

    {answer && (

        <div className="ai-response">

            {answer}

        </div>

    )}

</div>

    <div className="streak-container">

    🔥 Study Streak:
    <span> {streak} Days</span>

</div>

<div className="stats-container">

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
            <div className="progress-section">

                <h2>
                    Progress: {progress}%
                </h2>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    ></div>

                </div>

            </div>

            <div className="weekly-chart">

    <h2>📈 Weekly Study Analytics</h2>

    <LineChart
        width={700}
        height={300}
        data={weeklyData}
    >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Line
            type="monotone"
            dataKey="hours"
            stroke="#38bdf8"
            strokeWidth={4}
        />

    </LineChart>

</div>


            <div className="chart-container">

    <h2>Study Progress Chart</h2>

    <PieChart width={350} height={300}>

        <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
        >

            {chartData.map((entry, index) => (

                <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                />

            ))}

        </Pie>

        <Tooltip />

        <Legend />

    </PieChart>

</div>

<div className="task-container">

{tasks
    .filter((task) =>
        task.subject
            .toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            )
    )
    .map((task) => (

                    <div
                        className={`task-card ${
                            completedTasks.includes(task._id)
                                ? "completed"
                                : ""
                        } ${
                            task.priority === "High"
                                ? "high"
                                : task.priority === "Medium"
                                ? "medium"
                                : "low"
                        }`}
                        key={task._id}
                    >

                        <div className="task-header">

                            <h2>{task.subject}</h2>

                            <input
                                type="checkbox"
                                checked={completedTasks.includes(task._id)}
                                onChange={() => {

                                    if (completedTasks.includes(task._id)) {

                                        setCompletedTasks(
                                            completedTasks.filter(
                                                (id) => id !== task._id
                                            )
                                        );

                                    } else {

                                        setCompletedTasks([
                                            ...completedTasks,
                                            task._id
                                        ]);
                                    }
                                }}
                            />

                        </div>

                        <p>{task.studyNotes}</p>

                        <p>
                            Priority: {task.priority}
                        </p>

                        <p>
                            Study Hours: {task.studyHours}
                        </p>

                        <p>
                             Deadline: {task.deadline || "No deadline"}
                        </p>

                        {task.deadline &&
new Date(task.deadline).getTime() - new Date().getTime() <
3 * 24 * 60 * 60 * 1000 && (

    <p className="deadline-warning">
        ⚠️ Deadline approaching!
    </p>

)}

 <p className="ai-tip">

    {task.priority === "High"
        ? " Focus deeply and revise this subject twice today."
        : task.priority === "Medium"
        ? "📘 Practice consistently for better retention."
        : " Light revision is enough for today."}

</p>

                        <button
    onClick={() => {

        setSubject(task.subject);

        setStudyNotes(task.studyNotes);

        setPriority(task.priority);

        setStudyHours(task.studyHours);

        setDeadline(task.deadline || "");

        setEditingTask(task._id);
    }}
>
    Edit
</button>

                        <button
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Dashboard;