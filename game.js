let userScore = 0;
let compScore = 0;
let timerInterval; // Declare a variable to store the interval reference
let gameActive = true; // Variable to track if the game is active or not

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const timerDisplay = document.querySelector("#timer");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }

  // Display computer's choice
  document.getElementById('comp-choice').textContent = compChoice;
};

const playGame = (userChoice) => {
  // Check if the game is still active
  if (!gameActive) return;

  // Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    // Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      // Scissors, Paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      // Rock, Scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      // Rock, Paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

const startTimer = (duration) => {
  let time = duration;
  timerInterval = setInterval(() => {
    timerDisplay.textContent = time;
    time--;

    if (time < 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = 'Time Up!';
      determineWinner();
      // Disable event listeners on choices
      choices.forEach(choice => {
        choice.removeEventListener('click', handleChoiceClick);
      });
      gameActive = false; // Set game to inactive
      alert("Time's up!");
    }
  }, 1000);
};

const determineWinner = () => {
  let winner = '';

  if (userScore > compScore) {
    winner = "You";
  } else if (compScore > userScore) {
    winner = "Computer";
  } else {
    winner = "Nobody";
  }

  msg.innerText = `Time's up! ${winner} wins!`;
  msg.style.backgroundColor = "black";
};

const handleChoiceClick = (choice) => {
  const userChoice = choice.getAttribute("id");
  playGame(userChoice);
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Example: Start the timer for 10 seconds when the page loads
startTimer(10);




