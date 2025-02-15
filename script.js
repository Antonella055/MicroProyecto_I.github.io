const colorButtons = document.querySelectorAll(".color_button");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const outButton = document.getElementById("exit-button");
const scoreDisplay = document.getElementById("score");
const nameInput = document.getElementById("name-input");
const currentScoreElement = document.getElementById("current-score");
const maxScoreElement = document.getElementById("max-score");

let isGameActive = false;
let sequence = [];
let playerSequence = [];
let round = 0;
let currentScore = 0;
let maxScore = 0;

const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
};

const highlightButton = (button) => {
    button.classList.add("active");
    setTimeout(() => {
        button.classList.remove("active");
    }, 500); 
};

const generateSequence = () => {
    const randomColor = colorButtons[Math.floor(Math.random() * colorButtons.length)];
    sequence.push(randomColor);
};

const showSequence = () => {
    let i = 0;
    const interval = setInterval(() => {
        const button = sequence[i];
        highlightButton(button);
        playSound(button.getAttribute("data-sound"));
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 800); 
};

const nextRound = () => {
    round++;
    scoreDisplay.textContent = `Ronda: ${round}`;
    generateSequence();
    showSequence();
    playerSequence = [];
};

const checkSequence = () => {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            endGame();
            return;
        }
    }
    if (playerSequence.length === sequence.length) {
        currentScore += 10;
        currentScoreElement.textContent = currentScore;
        setTimeout(() => {
            nextRound();
        }, 1000);
    }
};

const endGame = () => {
    isGameActive = false;
    alert(`¡Perdiste! Llegaste a la ronda ${round}.`);
    saveScore();
    startButton.disabled = false;
    resetButton.disabled = true;
    currentScore = 0;
    currentScoreElement.textContent = currentScore;
};

const saveScore = () => {
    const playerName = nameInput.value.trim();
    if (playerName) {
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push({ name: playerName, score: currentScore });
        localStorage.setItem("scores", JSON.stringify(scores));
        updateMaxScore(playerName);
    }
};

const updateMaxScore = (playerName) => {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    const playerScores = scores.filter(score => score.name === playerName);
    const maxScore = playerScores.reduce((max, score) => Math.max(max, score.score), 0);
    maxScoreElement.textContent = maxScore;
};

startButton.addEventListener("click", () => {
    const playerName = nameInput.value.trim();
    if (!playerName) {
        alert("Por favor, ingresa tu nombre antes de comenzar.");
        return;
    }
    if (!isGameActive) {
        isGameActive = true;
        sequence = [];
        playerSequence = [];
        round = 0;
        currentScore = 0;
        scoreDisplay.textContent = `Ronda: ${round}`;
        currentScoreElement.textContent = currentScore;
        startButton.disabled = true;
        resetButton.disabled = false;
        updateMaxScore(playerName);
        nextRound();
    }
});

resetButton.addEventListener("click", () => {
    if (isGameActive) {
        nameInput.value = "";
        saveScore();
    }
    isGameActive = false;
    sequence = [];
    playerSequence = [];
    round = 0;
    currentScore = 0;
    scoreDisplay.textContent = `Ronda: ${round}`;
    currentScoreElement.textContent = currentScore;
    startButton.disabled = false;
    resetButton.disabled = true;
});

outButton.addEventListener("click", () => {
    if (isGameActive) {
        saveScore();
    }
    isGameActive = false;
    sequence = [];
    playerSequence = [];
    round = 0;
    currentScore = 0;
    maxScore = 0;
    scoreDisplay.textContent = `Ronda: ${round}`;
    currentScoreElement.textContent = currentScore;
    startButton.disabled = false;
    resetButton.disabled = true;

    window.location.href = "index.html";
});

colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (isGameActive) {
            highlightButton(button);
            playSound(button.getAttribute("data-sound"));
            playerSequence.push(button);
            checkSequence();
        }
    });
});