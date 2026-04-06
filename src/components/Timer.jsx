import React, { useState, useEffect, useEffectEvent } from "react";

export default function Timer({ onTimeOut, currentQuestionIndex, timePerQuestion }) {
    const [timeLeft, setTimeLeft] = useState(timePerQuestion);

    useEffect(() => {
        setTimeLeft(15);

        const intervalId = setInterval(() => {
            setTimeLeft((previousTime) => (previousTime > 0 ? previousTime - 1 : 0));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [currentQuestionIndex, onTimeOut]);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeOut();
        }
    }, [timeLeft, onTimeOut]);

    return (
        <div className="timer">
            <strong>Time left: {timeLeft}s</strong>
        </div>
    );
}

