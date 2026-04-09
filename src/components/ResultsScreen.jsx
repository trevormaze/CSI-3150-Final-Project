import React from "react";

export default function ResultsScreen({ score, setGameState }) {
    const titleStyle = "pt-4 mb-2";
    const textStyle = "mb-4 justify-center border-2 border-slate-400 rounded-lg py-2 px-4 text-2xl";
    const answersStyle = "flex flex-col gap-4 p-4";
    const answerStyle = "flex flex-row justify-between gap-4 border-2 border-slate-400 rounded-lg px-2 py-1 justify-center font-bold";
    const inputStyle = "bg-transparent placeholder:text-white-700 text-white-900 text-sm border border-slate-200 rounded-md p-1";
    const selectStyle = "bg-transparent placeholder:text-white-700 text-white-900 text-sm border border-slate-200 rounded-md p-1";
    const buttonStyle = "bg-transparent placeholder:text-white-700 text-white-900 text-lg border border-slate-200 rounded-md p-1 mt-4 w-full";
    const infosStyle = "flex flex-row gap-4 p-4 flex-center items-center justify-center";
    const categoryStyle = "border-2 border-slate-400 rounded-lg px-2 py-1";
    const difficultyStyle = "border-2 border-slate-400 rounded-lg px-2 py-1";

    return (
        <div className="screen">
            <h2 className={titleStyle}>Game over</h2>
            <p className={textStyle}>Final score: {score}</p>
            
            <button className={buttonStyle} onClick={() => setGameState("START_SCREEN")}>Play again</button>
        </div>
    );
}

