import React, { useState } from "react";

function Dashboard() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const askAI = () => {
        if (question.toLowerCase().includes("dbms")) {
            setAnswer("📘 Focus on normalization, SQL joins, and transactions.");
        } else if (question.toLowerCase().includes("ai")) {
            setAnswer("🤖 Revise machine learning algorithms and neural networks.");
        } else if (question.toLowerCase().includes("network")) {
            setAnswer("🌐 Practice OSI model, TCP/IP, and subnetting.");
        } else {
            setAnswer("✨ Stay consistent and revise daily for better learning.");
        }
    };

    return (
        <div className="ai-chat-container">
            <h2>🤖 AI Study Assistant</h2>
            <input
                type="text"
                placeholder="Ask something..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={askAI}>Ask AI</button>
            {answer && <div className="ai-response">{answer}</div>}
        </div>
    );
}

export default Dashboard;
