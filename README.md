# CSI 3150 Final Project Submission Template W26
### Name: Trevor Maze
### Project Option Chosen: Trivia
### Live App URL: https://csi-3150-final-project.vercel.app/
### GitHub Repository URL: https://github.com/trevormaze/CSI-3150-Final-Project

1. Technical Report & User Manual
1.1. Project Overview
This app is A Trivial Quiz, a quiz engine integrating with the Open Trivia DB API to allow you to answer customized quizzes on the web. It lets you customize the quiz length, time per question, question difficulty, and question category.
1.2. Component Architecture
•	App.jsx: Root component; manages switching between the three game screens with the gameState useState.
•	StartScreen.jsx: Screen component for the start screen. Contains a useEffect hook that fetches the Trivia API for trivia. Also includes the Leaderboard component.
•	QuizActive.jsx: Screen component for the main trivia game. Takes a list of questions and displays them with the specified amount of time on the Timer component.
•	ResultsScreen.jsx: Screen component for the results screen. Takes in the number of questions and the number of correct questions and supports adding to the leaderboard. Also contains a leaderboard that updates when you add your score.
•	Leaderboard.jsx: Componenet for grabbing the localstorage scores and displaying them in leaderboard format.
•	Timer.jsx: Simply manages the timer and the countdown logic. Takes in the amount of seconds per question. It uses a useEffect that responds to the time left state change to handle checking when the timer is at zero. If it’s zero, it fires that back to the quizactive component.
1.3. Detailed Functionality
•	Feature 1 - Timer: Passed a function for what to do when the time runs out and the number of seconds per question. Uses setinterval to count down and calls the function when the timer is zero. The function is handled by QuizActive and resets the content, initializing a new timer.
•	Feature 2 - Open Trivia DB API: The StartScreen has two API fetches from the Open Trivia DB API. First it grabs all the available categories and puts them in a select, then when you customize your quiz, it gets those specific questions and passes them to the QuizActive. The response contains an object with the question, the category and difficulty, as well as the correct answer and an array of incorrect answers.
•	Feature 3 - Leaderboard: Once you finish, you have the option to register your name and put it on the leaderboard with your score. This is stored in a stringified JSON in the browser’s localstorage, then the Leaderboard component takes that data and renders it.
•	Feature 4 - Shuffle: The questions that come from the API always have the correct answer in the same place, so the Fisher-Yates shuffle is implemented to group all possible answer choices together and shuffle them so that the correct answer is always in a different and unpredictable place. It just uses the browser’s Random to generate the random numbers for the shuffle.
1.4. User Manual
•	Step 1: To start, open the web page and wait for the initial trivia categories to load. 
•	Step 2: Then, you can select the amount of questions, time per question, category, and difficulty. You can also see the leaderboard.
•	Step 3: When you’re ready, click the start button to begin the quiz. 
•	Step 4: Then, you just read the question and click on what you think is the right answer. You’ll get feedback if you get it right or wrong. 
•	Step 5: Once it’s finished, you’ll be taken to the results screen where you can input your name and click the button next to it to save your score in the leaderboard. 
•	Step 6: When you’re done, click play again to go back to the beginning and play again.
2. Technical Challenges and Solutions
The biggest major hurdle was managing state with React. So there were many times where I’d forget to configure a useEffect’s dependency array and it would endlessly loop. Then I’d have to put debugging statements and use the React Developer Tools extension to see what was going on and find the useEffect that was the problem. The solution was usually to either add a dependency array, or take out one or a few of the state in it so that it wouldn’t trigger the loop. Another challenge was implementing loading screens and waiting for the trivia api to respond. I had to add an extra state variable for loading and update that once the trivia api responded in a useEffect so that it would render the page first, then update to show the content once it was available.
3. Demo Video Link
https://youtu.be/k4esDQvVoDA
