import React, { useState } from "react";
import StartScreen from "./StartScreen";
import QuizActive from "./QuizActive";
import ResultsScreen from "./ResultsScreen";

export default function App() {
    const [gameState, setGameState] = useState("START_SCREEN");
    const [score, setScore] = useState(0);
    const [shake, setShake] = useState("");
    const [animation, setAnimation] = useState("");

    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [category, setCategory] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [timePerQuestion, setTimePerQuestion] = useState(0);

    const [questions, setQuestions] = useState([]);

    const style = "flex justify-center bg-gradient-to-br from-gray-700 to-gray-900 h-screen w-screen"
    return (
        <div className={style}>
            <div className={animation + " w-screen flex justify-center"}>
                {gameState === "START_SCREEN" && (
                    <StartScreen setGameState={setGameState} setScore={setScore} setNumberOfQuestions={setNumberOfQuestions} setCategory={setCategory} setDifficulty={setDifficulty} setQuestions={setQuestions} setTimePerQuestion={setTimePerQuestion}/>
                )}

                {gameState === "QUIZ_ACTIVE" && (
                    <QuizActive setGameState={setGameState} score={score} setScore={setScore} questions={questions} timePerQuestion={timePerQuestion} setAnimation={setAnimation} setShake={setShake} shake={shake}/>
                )}

                {gameState === "RESULTS_SCREEN" && (
                    <ResultsScreen score={score} numberOfQuestions={numberOfQuestions} setGameState={setGameState} />
                )}
            </div>
        </div>
    );
}

