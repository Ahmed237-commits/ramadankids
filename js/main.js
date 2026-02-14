// ===================================
// RAMADAN KIDS WEBSITE - MAIN JS
// Star tracking and global utilities
// ===================================

// Initialize star count from localStorage
let starCount = parseInt(localStorage.getItem('ramadanStars')) || 0;

// Update star display on page load
document.addEventListener('DOMContentLoaded', () => {
    updateStarDisplay();
    addSoundEffects();
    initializeRamadanDate();
});

// Update star count display
function updateStarDisplay() {
    const starCountElement = document.getElementById('starCount');
    if (starCountElement) {
        starCountElement.textContent = starCount;
        
        // Animate the counter when updated
        starCountElement.style.animation = 'none';
        setTimeout(() => {
            starCountElement.style.animation = 'tada 0.6s ease-in-out';
        }, 10);
    }
}

// Add stars to user's count
function addStars(amount) {
    starCount += amount;
    localStorage.setItem('ramadanStars', starCount);
    updateStarDisplay();
    
    // Show celebration animation
    showStarCelebration(amount);
    
    // Check for milestones
    checkMilestone();
}

// Show star celebration animation
function showStarCelebration(amount) {
    const celebration = document.createElement('div');
    celebration.className = 'star-celebration';
    celebration.innerHTML = `+${amount} ⭐`;
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        font-family: var(--font-heading);
        color: var(--star-gold);
        animation: star-collect 1.5s ease-out forwards;
        z-index: 1000;
        pointer-events: none;
        text-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
    `;
    
    document.body.appendChild(celebration);
    
    // Play success sound
    playSound('success');
    
    // Remove after animation
    setTimeout(() => {
        celebration.remove();
    }, 1500);
    
    // Add confetti
    createConfetti();
}

// Create confetti effect
function createConfetti() {
    const colors = ['⭐', '✨', '🌟', '💫'];
    const confettiCount = 20;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 2 + 1}rem;
            animation: confetti-fall ${Math.random() * 2 + 2}s linear forwards;
            z-index: 999;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Check for milestone achievements
function checkMilestone() {
    const milestones = [
        { stars: 10, name: 'Bronze Moon', emoji: '🥉' },
        { stars: 25, name: 'Silver Moon', emoji: '🥈' },
        { stars: 50, name: 'Gold Moon', emoji: '🥇' },
        { stars: 100, name: 'Diamond Star', emoji: '💎' }
    ];
    
    milestones.forEach(milestone => {
        const achieved = localStorage.getItem(`milestone_${milestone.stars}`);
        if (starCount >= milestone.stars && !achieved) {
            showMilestoneNotification(milestone);
            localStorage.setItem(`milestone_${milestone.stars}`, 'true');
        }
    });
}

// Show milestone notification
function showMilestoneNotification(milestone) {
    const notification = document.createElement('div');
    notification.className = 'milestone-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 3rem;
            border-radius: 30px;
            box-shadow: 0 20px 60px rgba(139, 92, 246, 0.4);
            text-align: center;
            z-index: 1001;
            animation: bounce-in 0.6s ease-out;
            border: 5px solid var(--star-gold);
            max-width: 90vw;
        ">
            <div style="font-size: 6rem; margin-bottom: 1rem;">${milestone.emoji}</div>
            <h2 style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--moonlight-purple); margin-bottom: 1rem;">
                Congratulations!
            </h2>
            <p style="font-size: 1.5rem; color: var(--sunset-orange); font-weight: 700;">
                You earned the ${milestone.name}!
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                margin-top: 2rem;
                padding: 1rem 2rem;
                font-size: 1.2rem;
                font-family: var(--font-heading);
                background: var(--gradient-sunset);
                border: none;
                border-radius: 20px;
                color: white;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(251, 147, 60, 0.4);
            ">
                Amazing! 🎉
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    playSound('milestone');
    createConfetti();
}

// Sound effects (simple beep sounds using Web Audio API)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'success') {
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } else if (type === 'milestone') {
        // Celebration sound
        oscillator.frequency.value = 523.25; // C5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'click') {
        oscillator.frequency.value = 600;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Add sound effects to buttons
function addSoundEffects() {
    const buttons = document.querySelectorAll('.section-card, button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            playSound('click');
        });
    });
}

// Initialize Ramadan date tracking
function initializeRamadanDate() {
    // Get current day (1-30) for daily reflection rotation
    const today = new Date();
    const ramadanDay = (today.getDate() % 30) + 1; // Simple rotation
    localStorage.setItem('ramadanDay', ramadanDay);
}

// Get current Ramadan day
function getRamadanDay() {
    return parseInt(localStorage.getItem('ramadanDay')) || 1;
}

// Reset all progress (for testing or new Ramadan)
function resetProgress() {
    if (confirm('Are you sure you want to reset all your stars? 🌟')) {
        localStorage.clear();
        starCount = 0;
        updateStarDisplay();
        alert('All progress has been reset! Start your new adventure! 🚀');
    }
}

// Export progress as JSON
function exportProgress() {
    const data = {
        stars: starCount,
        milestones: [],
        date: new Date().toISOString()
    };
    
    // Get achieved milestones
    [10, 25, 50, 100].forEach(stars => {
        if (localStorage.getItem(`milestone_${stars}`)) {
            data.milestones.push(stars);
        }
    });
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ramadan-stars-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

// Import progress from JSON
function importProgress(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        starCount = data.stars || 0;
        localStorage.setItem('ramadanStars', starCount);
        
        data.milestones.forEach(stars => {
            localStorage.setItem(`milestone_${stars}`, 'true');
        });
        
        updateStarDisplay();
        alert('Progress imported successfully! 🎉');
    } catch (error) {
        alert('Error importing progress. Please check the file.');
    }
}

// Utility: Go back to homepage
function goHome() {
    window.location.href = 'index.html';
}

// Make functions globally available
window.addStars = addStars;
window.goHome = goHome;
window.resetProgress = resetProgress;
window.exportProgress = exportProgress;
window.importProgress = importProgress;
window.getRamadanDay = getRamadanDay;
window.playSound = playSound;
