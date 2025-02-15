
let sequence = [];
let playerSequence = [];
let round = 0;
let isGameActive = false;


const colorButtons = document.querySelectorAll(".color_button");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const scoreDisplay = document.getElementById("score");
const nameInput = document.getElementById("name-input");
const scoreList = document.getElementById("score-list");

const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
};

const highlightButton = (button) => {
    button.classList.add("active");
    setTimeout(() => {
        button.classList.remove("active");
    }, 300);
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
    }, 600);
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
        scoreDisplay.textContent = `Ronda: ${round}`;
        startButton.disabled = true;
        resetButton.disabled = false;
        nextRound();
    }
});


resetButton.addEventListener("click", () => {
    isGameActive = false;
    sequence = [];
    playerSequence = [];
    round = 0;
    scoreDisplay.textContent = `Ronda: ${round}`;
    startButton.disabled = false;
    resetButton.disabled = true;
});


const nextRound = () => {
    round++;
    scoreDisplay.textContent = `Ronda: ${round}`;
    generateSequence();
    showSequence();
    playerSequence = [];
};


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


const checkSequence = () => {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            endGame();
            return;
        }
    }
    if (playerSequence.length === sequence.length) {
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
    nameInput.value = "";
};


const saveScore = () => {
    const playerName = nameInput.value.trim();
    if (playerName) {
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push({ name: playerName, score: round });
        localStorage.setItem("scores", JSON.stringify(scores));
        updateScoreTable();
    }
};


const updateScoreTable = () => {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scoreList.innerHTML = scores
        .sort((a, b) => b.score - a.score)
        .map((score) => `<tr><td>${score.name}</td><td>${score.score}</td></tr>`)
        .join("");
};


updateScoreTable();