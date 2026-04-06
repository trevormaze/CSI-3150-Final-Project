import React, { useEffect, useState } from "react";
export default function StartScreen({ setGameState, setScore, setNumberOfQuestions, setCategory, setDifficulty, setQuestions, setTimePerQuestion }) {
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const [categories, setCategories] = useState([]);

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
            console.error(error.message)
        }

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
            }
        }

        getCategories();
    }, []);

    if (!categoriesLoaded) {
        return (
            <div className="screen">
                <h1>Trivia Game</h1>
                <p>Loading categories...</p>
            </div>
        )
    }

    return (
        <div className="screen">
            <h1>Trivia Game</h1>

            <div className="setting">
                <label htmlFor="number">Number of Questions: </label>
                <input id="number" type="number" defaultValue={5} min={1} max={50}></input>
            </div>

            <div className="setting">
                <label htmlFor="time">Time per Question: </label>
                <input id="time" type="number" defaultValue={15} min={1} max={60}></input>
            </div>

            <div className="setting">
                <label htmlFor="category">Category: </label>
                <select id="category">
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="setting">
                <label htmlFor="difficulty">Difficulty: </label>
                <select id="difficulty">
                    <option value="">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <button onClick={handleStart}>Begin</button>
        </div>
    );
}

