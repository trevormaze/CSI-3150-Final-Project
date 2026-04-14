import React, { useEffect, useState } from "react";

export default function Leaderboard() {
    const answersStyle = "flex flex-col p-4 border-2 border-slate-400 bg-gray-900 rounded-lg";

    const scores = JSON.parse(window.localStorage.getItem("scores")) || { scores: [] };

    return (
        <div className={answersStyle} id="scores">

            <p className="text-2xl text-gray-100">Leaderboard</p>
            <hr className="my-2 border-1" />

        {scores.scores.length === 0 ? (
                <p className="textStyle">No scores yet</p>
            ) : (
                [...scores.scores].sort((a, b) => b.score - a.score)
                .slice(0, 5).map((score, index) => (
                    <div className="flex flex-row justify-between my-1">
                        <p className="font-bold text-gray-100">{index + 1}.</p>
                        <p key={index}>
                            <span className="text-gray-300 font-bold">{score.name}</span>
                        </p>
                        <p key={index + 100}>
                            <span className="font-bold text-green-500">{Math.round(score.score * 100)}%</span>
                        </p>
                    </div>
                )
            ))}
        </div>
    );
}

