// ===================================
// DAILY REFLECTION PAGE JAVASCRIPT
// Display and handle daily questions
// ===================================

const reflectionQuestions = [
    {
        day: 1,
        icon: '🍽️',
        question: 'Your friend forgot their lunch at school. You have extra food. What would you do?',
        options: [
            { letter: '🅰️', text: 'Share my food with them', feedback: 'Amazing! Sharing is caring! 💚' },
            { letter: '🅱️', text: 'Tell them where to buy food', feedback: 'That\'s kind and helpful! 💚' },
            { letter: '🅲️', text: 'Ask the teacher for help', feedback: 'Great thinking! Asking for help is smart! 💚' }
        ],
        lesson: 'In Ramadan, we learn to be generous and help each other!'
    },
    {
        day: 2,
        icon: '🎁',
        question: 'You have two toys and your little brother wants one. What do you do?',
        options: [
            { letter: '🅰️', text: 'Share one toy happily', feedback: 'Beautiful heart! Sharing makes everyone happy! 💙' },
            { letter: '🅱️', text: 'Play together with both toys', feedback: 'Wonderful idea! Playing together is fun! 💙' },
            { letter: '🅲️', text: 'Let them choose which one', feedback: 'So kind! Letting others choose shows love! 💙' }
        ],
        lesson: 'Sharing with family makes our bonds stronger!'
    },
    {
        day: 3,
        icon: '😢',
        question: 'Your classmate looks sad and lonely during break time. What can you do?',
        options: [
            { letter: '🅰️', text: 'Sit with them and talk', feedback: 'You\'re an amazing friend! 🌟' },
            { letter: '🅱️', text: 'Invite them to play', feedback: 'That\'s so thoughtful! 🌟' },
            { letter: '🅲️', text: 'Ask if they\'re okay', feedback: 'Caring and kind! 🌟' }
        ],
        lesson: 'Being kind to others makes the world happier!'
    },
    {
        day: 4,
        icon: '🤲',
        question: 'You really want to play, but it\'s prayer time. What should you do?',
        options: [
            { letter: '🅰️', text: 'Pray first, then play', feedback: 'Perfect choice! Allah loves this! ⭐' },
            { letter: '🅱️', text: 'Ask Mom to pray together', feedback: 'Beautiful! Praying together is special! ⭐' },
            { letter: '🅲️', text: 'Stop playing right away', feedback: 'Great discipline! So proud of you! ⭐' }
        ],
        lesson: 'Prayer is our special time with Allah!'
    },
    {
        day: 5,
        icon: '🧹',
        question: 'Your room is messy and Mom is preparing Iftar. What do you do?',
        options: [
            { letter: '🅰️', text: 'Clean my room to help Mom', feedback: 'Superstar helper! 🌟' },
            { letter: '🅱️', text: 'Ask if Mom needs help in kitchen', feedback: 'So thoughtful! 🌟' },
            { letter: '🅲️', text: 'Clean up and set the table', feedback: 'Amazing initiative! 🌟' }
        ],
        lesson: 'Helping our parents makes them happy and us better!'
    },
    {
        day: 6,
        icon: '💔',
        question: 'Someone accidentally broke your favorite pencil. How do you feel and act?',
        options: [
            { letter: '🅰️', text: 'Forgive them, it was an accident', feedback: 'Beautiful heart! Forgiveness is golden! 💛' },
            { letter: '🅱️', text: 'Say "It\'s okay, don\'t worry"', feedback: 'So kind and understanding! 💛' },
            { letter: '🅲️', text: 'Ask them to be careful next time', feedback: 'Calm and wise response! 💛' }
        ],
        lesson: 'Forgiving others shows we have a big, beautiful heart!'
    },
    {
        day: 7,
        icon: '🍪',
        question: 'Grandma gives you cookies. There\'s only enough for you. What do you do?',
        options: [
            { letter: '🅰️', text: 'Share with my siblings', feedback: 'Amazing generosity! 💚' },
            { letter: '🅱️', text: 'Save some for later to share', feedback: 'Smart and generous! 💚' },
            { letter: '🅲️', text: 'Thank Grandma and share half', feedback: 'Grateful and kind! 💚' }
        ],
        lesson: 'Sharing makes everything taste sweeter!'
    }
];

// Get current day's question (rotate through questions)
function getTodayQuestion() {
    const day = getRamadanDay();
    const index = (day - 1) % reflectionQuestions.length;
    return reflectionQuestions[index];
}

// Display question
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('questionContainer');
    const question = getTodayQuestion();
    const questionKey = `reflection_day_${getRamadanDay()}`;
    const alreadyAnswered = localStorage.getItem(questionKey);

    if (alreadyAnswered) {
        showCompletionMessage();
        return;
    }

    const html = `
        <div class="question-card">
            <div class="question-header">
                <div class="question-day">Day ${question.day} - Today's Question</div>
                <div class="question-icon">${question.icon}</div>
                <div class="question-text">${question.question}</div>
            </div>
            
            <div class="reflection-options" id="reflectionOptions">
                ${question.options.map((option, index) => `
                    <div class="reflection-option" onclick="selectReflection(${index})">
                        <div class="option-letter">${option.letter}</div>
                        <div>${option.text}</div>
                    </div>
                `).join('')}
            </div>
            
            <div id="feedbackContainer"></div>
        </div>
    `;

    container.innerHTML = html;
});

// Select reflection answer
function selectReflection(index) {
    const question = getTodayQuestion();
    const option = question.options[index];

    // Disable all options
    document.querySelectorAll('.reflection-option').forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === index) {
            opt.classList.add('selected');
        }
    });

    // Show feedback
    setTimeout(() => {
        showFeedback(option, question.lesson);
    }, 500);

    playSound('success');
}

// Show feedback
function showFeedback(option, lesson) {
    const feedbackContainer = document.getElementById('feedbackContainer');

    const html = `
        <div class="feedback-box">
            <div class="feedback-icon">🎉</div>
            <div class="feedback-title">${option.feedback}</div>
            <div class="feedback-text">You earned 2 stars! ⭐⭐</div>
            
            <div class="lesson-box">
                <h4>💡 Today's Lesson</h4>
                <p>${lesson}</p>
            </div>
            
            <button class="btn btn-primary" onclick="completeReflection()" style="margin-top: 1.5rem;">
                Continue 🎯
            </button>
        </div>
    `;

    feedbackContainer.innerHTML = html;
}

// Complete reflection
function completeReflection() {
    const questionKey = `reflection_day_${getRamadanDay()}`;
    localStorage.setItem(questionKey, 'true');

    // Add stars
    addStars(2);

    // Show completion
    showCompletionMessage();
}

// Show completion message
function showCompletionMessage() {
    const container = document.getElementById('questionContainer');

    const html = `
        <div class="completion-message">
            <div class="completion-icon">🌟</div>
            <h2>Today's Question Complete!</h2>
            <p style="font-size: 1.3rem; color: var(--sunset-orange); font-weight: 700; margin: 1rem 0;">
                ✅ You already answered today's question and earned your stars!
            </p>
            <p style="font-size: 1.1rem; color: #6B7280; margin-bottom: 2rem;">
                Come back tomorrow for a new question! 📅
            </p>
            <button class="btn btn-primary" onclick="goHome()">
                Back to Home 🏠
            </button>
        </div>
    `;

    container.innerHTML = html;
}
