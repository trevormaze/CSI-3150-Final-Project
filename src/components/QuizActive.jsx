import React, { useEffect, useState } from "react";
import Timer from "./Timer"

export default function QuizActive({ setGameState, score, setScore, questions, timePerQuestion }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const numberOfQuestions = questions.length

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
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
        <div className="screen">
            <h2>Question {currentQuestionIndex + 1} / {questions.length}</h2>
            <h3>{makeHTML(question.question)} | {question.category} | {question.difficulty}</h3>
            
            <Timer onTimeOut={handleTimeOut} currentQuestionIndex={currentQuestionIndex} timePerQuestion={timePerQuestion} />
            
            <div className="answers">
                {answers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswer(answer.correct)}>{answer.correct ? "*" : ""}{makeHTML(answer.text)}</button>
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

