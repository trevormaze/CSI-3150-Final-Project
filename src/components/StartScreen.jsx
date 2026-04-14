import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
export default function StartScreen({ setGameState, setScore, setNumberOfQuestions, setCategory, setDifficulty, setQuestions, setTimePerQuestion }) {
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const [categories, setCategories] = useState([]);

    const [error, setError] = useState(false);

    const titleStyle = "";
    const textStyle = "w-full pb-4 text-gray-200";
    const settingsStyle = "flex flex-col gap-4 border-2 border-slate-400 rounded-lg p-4 bg-gray-900 w-full box-border";
    const settingStyle = "flex flex-row justify-between gap-4 w-full";
    const inputStyle = "bg-gray-950 placeholder:text-gray-100 text-gray-200 text-sm border border-slate-200 rounded-md p-1 w-20 sm:w-28 text-center";
    const selectStyle = "bg-gray-950 placeholder:text-gray-100 text-gray-200 text-sm border border-slate-200 rounded-md p-1 w-28 sm:w-32";
    const buttonStyle = "bg-gray-950 placeholder:text-gray-100 text-gray-200 text-lg border border-slate-200 rounded-md p-1 mt-4 w-full bg-gray-900";

    const handleStart = async () => {
        const numberOfQuestions = document.querySelector("#number").value;
        const category = document.querySelector("#category").value;
        const difficulty = document.querySelector("#difficulty").value;
        const time = document.querySelector("#time").value;
setScore(0);

        setNumberOfQuestions(numberOfQuestions);
        setCategory(category);
        setDifficulty(difficulty);
        setTimePerQuestion(time);

        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`);
            if (!response.ok) {
                throw new Error(`Error (Code: ${response.status})`);
            }

            const result = await response.json();

            setQuestions(result.results);
        } catch (error) {
            console.log("Fail")
            console.error(error.message)
            setError(true);
            return
        }

        new Audio("click.mp3").play();
        setGameState("QUIZ_ACTIVE");
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch(`https://opentdb.com/api_category.php`);
                if (!response.ok) {
                    throw new Error(`Error (Code: ${response.status})`);
                }

                const result = await response.json();
                console.log(result);
                setCategories(result.trivia_categories);
                setCategoriesLoaded(true);
            } catch (error) {
                console.error(error.message)
                setError(true)
            }
        }

        getCategories();
    }, []);

    if (error) {
        return (
            <div className="screen">
                <h1 className={titleStyle}>Trivia Game</h1>
                <p className={textStyle}>Error loading trivia questions</p>
                <button className={buttonStyle} onClick={() => window.location.reload(false)}>Retry</button>
            </div>
        )
    }

    if (!categoriesLoaded) {
        return (
            <div className="screen">
                <h1 className={titleStyle}>Trivia Game</h1>
                <p className={textStyle}>Loading categories...</p>
            </div>
        )
    }

    return (
        <div className="screen">
            <h1 className={titleStyle}>Trivia Game</h1>
            <p className={textStyle}>Welcome! Please select the number and types of questions you would like, then click Begin to start.</p>

            <div className={settingsStyle}>
                <div className={settingStyle}>
                    <label htmlFor="number">Number of Questions: </label>
                    <input className={inputStyle} id="number" type="number" defaultValue={5} min={1} max={50}></input>
                </div>

                <div className={settingStyle}>
                    <label htmlFor="time">Time per Question: </label>
                    <input className={inputStyle} id="time" type="number" defaultValue={15} min={1} max={60}></input>
                </div>

                <div className={settingStyle}>
                    <label htmlFor="category">Category: </label>
                    <select id="category" className={selectStyle}>
                        <option value="">All</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className={settingStyle}>
                    <label htmlFor="difficulty">Difficulty: </label>
                    <select id="difficulty" className={selectStyle}>
                        <option value="">Any</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            </div>

            <button className={buttonStyle} onClick={handleStart}>Begin</button>

            <br className="my-8" />
            <Leaderboard />
        </div>
    );
}

