import React, { useState } from "react";
import StartScreen from "./StartScreen";
import QuizActive from "./QuizActive";
import ResultsScreen from "./ResultsScreen";

export default function App() {
    const [gameState, setGameState] = useState("START_SCREEN");
    const [score, setScore] = useState(0);

    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [category, setCategory] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [timePerQuestion, setTimePerQuestion] = useState(0);

    const [questions, setQuestions] = useState([]);

    return (
        <div className="app-container" style={{display: "flex", justifyContent: "center"}}>
            {gameState === "START_SCREEN" && (
                <StartScreen setGameState={setGameState} setScore={setScore} setNumberOfQuestions={setNumberOfQuestions} setCategory={setCategory} setDifficulty={setDifficulty} setQuestions={setQuestions} setTimePerQuestion={setTimePerQuestion}/>
            )}

            {gameState === "QUIZ_ACTIVE" && (
                <QuizActive setGameState={setGameState} score={score} setScore={setScore} questions={questions} timePerQuestion={timePerQuestion}/>
            )}

            {gameState === "RESULTS_SCREEN" && (
                <ResultsScreen score={score} setGameState={setGameState} />
            )}
        </div>
    );
}

