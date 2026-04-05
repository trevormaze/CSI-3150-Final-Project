import React from "react";

export default function ResultsScreen({ score, setGameState }) {
    return (
        <div className="screen">
            <h2>Game over</h2>
            <p>Final score: {score}</p>
            
            <button onClick={() => setGameState("START_SCREEN")}>Play again</button>
        </div>
    );
}

