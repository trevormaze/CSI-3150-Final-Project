import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";

export default function ResultsScreen({ score, numberOfQuestions, setGameState }) {
    const titleStyle = "pt-4 mb-2";
    const textStyle = "mb-4 justify-center border-2 border-slate-400 rounded-lg py-2 px-4 text-2xl bg-gray-900";
    const answersStyle = "flex flex-col gap-4 p-4 border-2 border-slate-400 bg-gray-900 rounded-lg";
    const answerStyle = "flex flex-row justify-between gap-4 border-2 border-slate-400 rounded-lg px-2 py-1 justify-center font-bold";
    const inputStyle = "bg-gray-900 placeholder:text-white-700 text-white-900 text-sm border border-slate-200 rounded-md p-1 focus:outline-none";
    const selectStyle = "bg-transparent placeholder:text-white-700 text-white-900 text-sm border border-slate-200 rounded-md p-1";
    const buttonStyle = "placeholder:text-white-700 text-white-900 text-lg border border-slate-200 rounded-md p-1 mt-2 w-full bg-gray-900";
    const submitButtonStyle = "bg-gray-900 hover:bg-gray-700 text-white text-base border-2 border-slate-400 rounded-md px-4 py-2 transition-all active:bg-gray-900";
    const infosStyle = "flex flex-row gap-4 p-4 flex-center items-center justify-center";
    const categoryStyle = "border-2 border-slate-400 rounded-lg px-2 py-1";
    const difficultyStyle = "border-2 border-slate-400 rounded-lg px-2 py-1";

    const [ scores, setScores ] = useState(JSON.parse(window.localStorage.getItem("scores")) || { scores: [] });

    const submitName = () => {
        const name = document.querySelector("input").value;
        if (!name.trim()) { return; }
        var scores = JSON.parse(window.localStorage.getItem("scores"));
        if (!scores) { scores = { scores: [] } }
        scores.scores.push({ name: name, score: score / numberOfQuestions });
        window.localStorage.setItem("scores", JSON.stringify(scores));
        setScores(scores);
        document.querySelector("input").value = "";
    }

    return (
        <div className="screen">
            <h2 className={titleStyle}>Game over</h2>
            <p className={textStyle}>Final score: {score}/{numberOfQuestions} - {Math.round((score / numberOfQuestions) * 100)}%</p>
            <div className="flex flex-row gap-2 items-center py-2">
                <input className={inputStyle} type="text" placeholder="Your name..." />
                <button className={submitButtonStyle} onClick={submitName}>Submit score</button>
            </div>
            <Leaderboard />
            
            <button className={buttonStyle} onClick={() => { new Audio("click.mp3").play(); setGameState("START_SCREEN"); }}>Play again</button>
        </div>
    );
}

