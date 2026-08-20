import React, { useState } from "react";

function Dashboard() {
    const emojis = ["🎯", "📚", "🚀", "🔥", "🎮", "💡"];
    const gameCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    const flipCard = (index) => {
        if (flippedCards.length === 2 || flippedCards.includes(index)) return;
        const newFlipped = [...flippedCards, index];
        setFlippedCards(newFlipped);
        if (newFlipped.length === 2) {
            const first = gameCards[newFlipped[0]];
            const second = gameCards[newFlipped[1]];
            if (first === second) setMatchedCards([...matchedCards, first]);
            setTimeout(() => setFlippedCards([]), 800);
        }
    };

    return (
        <div className="game-container">
            <h2>🧩 Relaxation Memory Game</h2>
            <div className="game-grid">
                {gameCards.map((emoji, index) => (
                    <div
                        key={index}
                        className={`game-card ${flippedCards.includes(index) || matchedCards.includes(emoji) ? "flipped" : ""}`}
                        onClick={() => flipCard(index)}
                    >
                        {flippedCards.includes(index) || matchedCards.includes(emoji) ? emoji : "❓"}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
