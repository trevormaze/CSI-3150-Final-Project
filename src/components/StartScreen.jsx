import React from "react";

export default function StartScreen({ setGameState, setScore, numberOfQuestions, setNumberOfQuestions }) {
    const handleStart = () => {
        setScore(0);
        setNumberOfQuestions(document.querySelector("input").value)
        setGameState("QUIZ_ACTIVE");
    };

    return (
        <div className="screen">
            <h1>Trivia Game</h1>
            <p>Select category/difficulty</p>
            <input type="number" defaultValue={numberOfQuestions}></input>

            <button onClick={handleStart}>Begin</button>
        </div>
    );
}

