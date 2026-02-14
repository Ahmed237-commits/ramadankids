// ===================================
// GAMES PAGE JAVASCRIPT
// Interactive game logic
// ===================================

let currentGame = null;

// Start a game
function startGame(gameType) {
    currentGame = gameType;
    const menu = document.getElementById('gamesMenu');
    const container = document.getElementById('gameContainer');

    menu.style.display = 'none';
    container.style.display = 'block';

    if (gameType === 'memory') {
        initMemoryGame();
    } else if (gameType === 'garden') {
        initGardenGame();
    } else if (gameType === 'quiz') {
        initQuizGame();
    }
}

// Return to games menu
function backToGames() {
    const menu = document.getElementById('gamesMenu');
    const container = document.getElementById('gameContainer');

    menu.style.display = 'grid';
    container.style.display = 'none';
    container.innerHTML = '';
    currentGame = null;
}

// === MEMORY MATCH GAME ===
const memoryCards = [
    '🌙', '⭐', '🕌', '🤲', '📿', '🏮'
];

let flippedCards = [];
let matchedPairs = 0;

function initMemoryGame() {
    // Check if already completed
    const completed = localStorage.getItem('game_memory');

    // Create card pairs and shuffle
    const cards = [...memoryCards, ...memoryCards]
        .sort(() => Math.random() - 0.5);

    const html = `
        <button class="back-to-games" onclick="backToGames()">⬅️ Back to Games</button>
        <div class="game-header">
            <h2>🎯 Memory Match</h2>
            <p style="font-size: 1.2rem; color: var(--sunset-orange); font-weight: 700;">
                Find all the matching pairs!
            </p>
        </div>
        <div class="memory-board" id="memoryBoard">
            ${cards.map((card, index) => `
                <div class="memory-card hidden" data-card="${card}" data-index="${index}" onclick="flipCard(this)">
                    ${card}
                </div>
            `).join('')}
        </div>
        ${completed ? '<p style="text-align: center; color: var(--fresh-green); font-weight: 700; margin-top: 2rem;">✅ You already completed this game!</p>' : ''}
    `;

    document.getElementById('gameContainer').innerHTML = html;
    flippedCards = [];
    matchedPairs = 0;
}

function flipCard(card) {
    if (flippedCards.length >= 2) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.remove('hidden');
    card.classList.add('flipped');
    flippedCards.push(card);

    playSound('click');

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.card === card2.dataset.card;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        playSound('success');

        if (matchedPairs === memoryCards.length) {
            setTimeout(() => completeMemoryGame(), 500);
        }
    } else {
        card1.classList.add('hidden');
        card1.classList.remove('flipped');
        card2.classList.add('hidden');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

function completeMemoryGame() {
    const alreadyCompleted = localStorage.getItem('game_memory');

    if (!alreadyCompleted) {
        localStorage.setItem('game_memory', 'true');
        addStars(1);
    }

    const board = document.getElementById('memoryBoard');
    board.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
            <div style="font-size: 6rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="font-family: var(--font-heading); color: var(--moonlight-purple); font-size: 2.5rem; margin-bottom: 1rem;">
                You Found Them All!
            </h2>
            <p style="font-size: 1.3rem; color: var(--sunset-orange); font-weight: 700;">
                ${alreadyCompleted ? '✅ You already earned your star!' : '⭐ You earned a star!'}
            </p>
            <button class="btn btn-primary" onclick="initMemoryGame()" style="margin-top: 2rem;">
                Play Again 🔄
            </button>
        </div>
    `;
}

// === GOOD DEEDS GARDEN GAME ===
const scenarios = [
    { id: 1, icon: '🤝', text: 'Help Mom', isGood: true },
    { id: 2, icon: '🎁', text: 'Share Toys', isGood: true },
    { id: 3, icon: '🤲', text: 'Pray on Time', isGood: true },
    { id: 4, icon: '😊', text: 'Smile & Be Kind', isGood: true },
    { id: 5, icon: '📚', text: 'Read Quran', isGood: true },
    { id: 6, icon: '💚', text: 'Say Thank You', isGood: true }
];

let flowersPlanted = 0;

function initGardenGame() {
    const completed = localStorage.getItem('game_garden');

    const html = `
        <button class="back-to-games" onclick="backToGames()">⬅️ Back to Games</button>
        <div class="game-header">
            <h2>🌸 Good Deeds Garden</h2>
            <p style="font-size: 1.2rem; color: var(--sunset-orange); font-weight: 700;">
                Click on good deeds to grow beautiful flowers!
            </p>
        </div>
        <div class="garden-board">
            <div class="garden-scenarios" id="gardenScenarios">
                ${scenarios.map(scenario => `
                    <div class="scenario-card" onclick="plantFlower(${scenario.id}, '${scenario.icon}')">
                        <div class="scenario-icon">${scenario.icon}</div>
                        <div class="scenario-text">${scenario.text}</div>
                    </div>
                `).join('')}
            </div>
            <div class="garden-plot">
                <h3 style="font-family: var(--font-heading); color: var(--fresh-green); font-size: 1.8rem;">
                    🌱 Your Beautiful Garden 🌱
                </h3>
                <p style="color: #6B7280; margin-top: 0.5rem;">Click the good deeds above!</p>
                <div class="garden-flowers" id="gardenFlowers"></div>
            </div>
        </div>
        ${completed ? '<p style="text-align: center; color: var(--fresh-green); font-weight: 700; margin-top: 2rem;">✅ You already completed this game!</p>' : ''}
    `;

    document.getElementById('gameContainer').innerHTML = html;
    flowersPlanted = 0;
}

function plantFlower(id, icon) {
    const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '🏵️'];
    const flower = flowers[flowersPlanted % flowers.length];

    const gardenFlowers = document.getElementById('gardenFlowers');
    const flowerElement = document.createElement('div');
    flowerElement.className = 'flower';
    flowerElement.textContent = flower;
    gardenFlowers.appendChild(flowerElement);

    playSound('success');
    flowersPlanted++;

    // Remove the clicked scenario
    const scenarios = document.getElementById('gardenScenarios');
    const scenario = scenarios.querySelector(`[onclick*="${id}"]`);
    if (scenario) {
        scenario.style.animation = 'star-collect 0.5s ease-out forwards';
        setTimeout(() => scenario.remove(), 500);
    }

    if (flowersPlanted === 6) {
        setTimeout(completeGardenGame, 1000);
    }
}

function completeGardenGame() {
    const alreadyCompleted = localStorage.getItem('game_garden');

    if (!alreadyCompleted) {
        localStorage.setItem('game_garden', 'true');
        addStars(2);
    }

    const container = document.getElementById('gameContainer');
    container.innerHTML = `
        <button class="back-to-games" onclick="backToGames()">⬅️ Back to Games</button>
        <div style="text-align: center; padding: 3rem;">
            <div style="font-size: 6rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="font-family: var(--font-heading); color: var(--moonlight-purple); font-size: 2.5rem; margin-bottom: 1rem;">
                Beautiful Garden!
            </h2>
            <div style="font-size: 3rem; margin: 2rem 0;">
                🌸🌺🌻🌷🌹🏵️
            </div>
            <p style="font-size: 1.3rem; color: var(--sunset-orange); font-weight: 700;">
                ${alreadyCompleted ? '✅ You already earned your stars!' : '⭐⭐ You earned 2 stars!'}
            </p>
            <button class="btn btn-primary" onclick="initGardenGame()" style="margin-top: 2rem;">
                Play Again 🔄
            </button>
        </div>
    `;
}

// === QUIZ GAME ===
const quizQuestions = [
    {
        question: "What do we eat to break our fast? 🍽️",
        options: [
            { icon: '🌴', text: 'Dates', correct: true },
            { icon: '🍭', text: 'Candy', correct: false },
            { icon: '🍔', text: 'Burger', correct: false }
        ]
    },
    {
        question: "When do we pray Taraweeh? 🤲",
        options: [
            { icon: '🌅', text: 'Morning', correct: false },
            { icon: '🌙', text: 'At Night', correct: true },
            { icon: '☀️', text: 'Afternoon', correct: false }
        ]
    },
    {
        question: "What makes Allah happy? 😊",
        options: [
            { icon: '😠', text: 'Being Mean', correct: false },
            { icon: '💚', text: 'Being Kind', correct: true },
            { icon: '😢', text: 'Being Sad', correct: false }
        ]
    },
    {
        question: "What should we say before eating? 🍽️",
        options: [
            { icon: '🤲', text: 'Bismillah', correct: true },
            { icon: '👋', text: 'Hello', correct: false },
            { icon: '😋', text: 'Yummy!', correct: false }
        ]
    },
    {
        question: "How should we treat our parents? 👪",
        options: [
            { icon: '😤', text: 'Ignore Them', correct: false },
            { icon: '❤️', text: 'With Love', correct: true },
            { icon: '😠', text: 'Get Angry', correct: false }
        ]
    }
];

let currentQuestion = 0;
let correctAnswers = 0;

function initQuizGame() {
    const completed = localStorage.getItem('game_quiz');

    currentQuestion = 0;
    correctAnswers = 0;

    const html = `
        <button class="back-to-games" onclick="backToGames()">⬅️ Back to Games</button>
        <div class="game-header">
            <h2>❓ Ramadan Quiz</h2>
            <p style="font-size: 1.2rem; color: var(--sunset-orange); font-weight: 700;">
                Answer Luna's questions!
            </p>
        </div>
        <div class="quiz-container" id="quizContainer">
            ${completed ? '<p style="text-align: center; color: var(--fresh-green); font-weight: 700; margin-bottom: 2rem;">✅ You already completed this quiz!</p>' : ''}
        </div>
    `;

    document.getElementById('gameContainer').innerHTML = html;
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const q = quizQuestions[currentQuestion];
    const html = `
        <div class="quiz-progress">
            Question ${currentQuestion + 1} of ${quizQuestions.length}
        </div>
        <div class="quiz-question">
            <h3>${q.question}</h3>
        </div>
        <div class="quiz-options" id="quizOptions">
            ${q.options.map((option, index) => `
                <div class="quiz-option" onclick="selectAnswer(${index}, ${option.correct})">
                    <span class="option-icon">${option.icon}</span>
                    <span>${option.text}</span>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('quizContainer').innerHTML = html;
}

function selectAnswer(index, isCorrect) {
    const options = document.querySelectorAll('.quiz-option');

    if (isCorrect) {
        options[index].classList.add('correct');
        correctAnswers++;
        playSound('success');
    }

    options.forEach(opt => opt.classList.add('disabled'));

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

function showQuizResult() {
    const alreadyCompleted = localStorage.getItem('game_quiz');

    if (!alreadyCompleted) {
        localStorage.setItem('game_quiz', 'true');
        addStars(2);
    }

    const html = `
        <div class="quiz-result">
            <div class="result-icon">🎉</div>
            <h2>Amazing Job!</h2>
            <p style="font-size: 1.5rem; color: var(--moonlight-purple); font-weight: 700; margin-bottom: 1rem;">
                You got ${correctAnswers} out of ${quizQuestions.length} correct!
            </p>
            <p style="font-size: 1.3rem; color: var(--sunset-orange); font-weight: 700;">
                ${alreadyCompleted ? '✅ You already earned your stars!' : '⭐⭐ You earned 2 stars!'}
            </p>
            <button class="btn btn-primary" onclick="initQuizGame()" style="margin-top: 2rem;">
                Play Again 🔄
            </button>
        </div>
    `;

    document.getElementById('quizContainer').innerHTML = html;
}
