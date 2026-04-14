import React, { useEffect, useState } from "react";
import Timer from "./Timer"

export default function QuizActive({ setGameState, score, setScore, questions, timePerQuestion, setAnimation, shake, setShake }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const numberOfQuestions = questions.length

    const titleStyle = "pt-4";
    const textStyle = "w-100 mb-4 justify-center border-2 border-slate-400 rounded-lg py-2 px-4 text-2xl bg-gray-900";
    const answersStyle = "flex flex-col gap-4 p-4";
    const answerStyle = "flex flex-row justify-between gap-4 border-2 border-slate-400 rounded-lg px-2 py-1 justify-center font-bold bg-gray-900";
    const infosStyle = "flex flex-row gap-4 p-4 flex-center items-center justify-center";
    const categoryStyle = "border-2 border-slate-400 rounded-lg px-2 py-1 bg-gray-900";
    const difficultyStyle = "border-2 border-slate-400 rounded-lg px-2 py-1 bg-gray-900";

    const settingsStyle = "flex flex-col gap-4 border-2 border-slate-400 rounded-lg p-4 bg-gray-900";
    const settingStyle = "flex flex-row justify-between gap-4";
    const inputStyle = "bg-gray-950 placeholder:text-gray-100 text-gray-300 text-sm border border-slate-200 rounded-md p-1";
    const selectStyle = "bg-gray-950 placeholder:text-gray-100 text-gray-300 text-sm border border-slate-200 rounded-md p-1";
    const buttonStyle = "bg-gray-950 placeholder:text-gray-100 text-gray-300 text-lg border border-slate-200 rounded-md p-1 mt-4 w-full bg-gray-900";

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
            new Audio("/correct.mp3").play();
            setAnimation("flash-green");
            setTimeout(() => setAnimation(""), 500);
        } else {
            new Audio("/incorrect.mp3").play();
            setAnimation("flash-red");
            setShake("animate-shake")
            setTimeout(() => setShake(""), 500);
            setTimeout(() => setAnimation(""), 500);
        }

        if (currentQuestionIndex >= numberOfQuestions - 1) {
            setGameState("RESULTS_SCREEN");
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleTimeOut = () => {
        handleAnswer(false);
    };

    useEffect(() => {
        if (questions.length > 0) {
            const question = questions[currentQuestionIndex];
            const allAnswers = [...question.incorrect_answers.map((answer) => ({ correct: false, text: answer })), { correct: true, text: question.correct_answer }];

            const shuffledAnswers = [...allAnswers];
            for (let i = shuffledAnswers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
            }

            setAnswers(shuffledAnswers);
        }
    }, [currentQuestionIndex, questions]);

    const question = questions[currentQuestionIndex];

    return (
        <div className={"screen " + shake}>
            <h2 className={titleStyle}>Question {currentQuestionIndex + 1} / {questions.length}</h2>
            <div className={infosStyle}>
                <h3 className={categoryStyle}>{question.category}</h3>
                <h3 className={difficultyStyle}>{question.difficulty.toUpperCase()}</h3>
            </div>
            <h3 className={textStyle}>{makeHTML(question.question)}</h3>
            
            <Timer onTimeOut={handleTimeOut} currentQuestionIndex={currentQuestionIndex} timePerQuestion={timePerQuestion} />
            
            <div className={answersStyle}>
                {answers.map((answer, index) => (
                    <button className={answerStyle} key={index} onClick={() => handleAnswer(answer.correct)}>{answer.correct ? "*" : ""}{makeHTML(answer.text)}</button>
                ))}
            </div>
        </div>
    );
}

const makeHTML = (text) => {
    const area = document.createElement("textarea");
    area.innerHTML = text;
    return area.value;
}

