import React, { useState } from "react";
import StartScreen from "./StartScreen";
import QuizActive from "./QuizActive";
import ResultsScreen from "./ResultsScreen";

export default function App() {
    const [gameState, setGameState] = useState("START_SCREEN");
    const [score, setScore] = useState(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState(3);

    return (
        <div className="app-container">
            {gameState === "START_SCREEN" && (
                <StartScreen setGameState={setGameState} setScore={setScore} numberOfQuestions={numberOfQuestions} setNumberOfQuestions={setNumberOfQuestions} />
            )}

            {gameState === "QUIZ_ACTIVE" && (
                <QuizActive setGameState={setGameState} score={score} setScore={setScore} numberOfQuestions={numberOfQuestions} />
            )}

            {gameState === "RESULTS_SCREEN" && (
                <ResultsScreen score={score} setGameState={setGameState} />
            )}
        </div>
    );
}

