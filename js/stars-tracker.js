// ===================================
// STARS TRACKER PAGE JAVASCRIPT
// Display star collection and achievements
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    displayStars();
    displayProgress();
    displayAchievements();
    displayActivity();
});

// Display star collection
function displayStars() {
    const collection = document.getElementById('starsCollection');
    const totalElement = document.getElementById('totalStars');

    const stars = parseInt(localStorage.getItem('ramadanStars')) || 0;

    // Create visual stars
    collection.innerHTML = '';
    for (let i = 0; i < stars; i++) {
        const star = document.createElement('span');
        star.className = 'collected-star';
        star.textContent = '⭐';
        star.style.animationDelay = `${i * 0.05}s`;
        collection.appendChild(star);
    }

    totalElement.textContent = stars;
}

// Display milestone progress
function displayProgress() {
    const milestones = [
        { stars: 10, name: 'Bronze Moon', emoji: '🥉' },
        { stars: 25, name: 'Silver Moon', emoji: '🥈' },
        { stars: 50, name: 'Gold Moon', emoji: '🥇' },
        { stars: 100, name: 'Diamond Star', emoji: '💎' }
    ];

    const stars = parseInt(localStorage.getItem('ramadanStars')) || 0;
    const progressInfo = document.getElementById('progressInfo');
    const progressFill = document.getElementById('progressFill');

    // Find next milestone
    let nextMilestone = milestones.find(m => stars < m.stars);

    if (!nextMilestone) {
        progressInfo.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">👑</div>
            <p>You've achieved all milestones!</p>
            <p style="color: var(--star-gold); margin-top: 0.5rem;">You're a Ramadan Champion!</p>
        `;
        progressFill.style.width = '100%';
        progressFill.textContent = '🎉';
        return;
    }

    const previousMilestone = milestones[milestones.indexOf(nextMilestone) - 1];
    const prevStars = previousMilestone ? previousMilestone.stars : 0;
    const progress = ((stars - prevStars) / (nextMilestone.stars - prevStars)) * 100;

    progressInfo.innerHTML = `
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${nextMilestone.emoji}</div>
        <p>${nextMilestone.name} - ${nextMilestone.stars} stars</p>
        <p style="color: var(--sunset-orange); margin-top: 0.5rem;">
            ${nextMilestone.stars - stars} more stars to go!
        </p>
    `;

    progressFill.style.width = `${progress}%`;
    progressFill.textContent = `${Math.round(progress)}%`;
}

// Display achievements
function displayAchievements() {
    const achievements = [
        { id: 'bronze', stars: 10, icon: '🥉', name: 'Bronze Moon', requirement: 'Earn 10 stars' },
        { id: 'silver', stars: 25, icon: '🥈', name: 'Silver Moon', requirement: 'Earn 25 stars' },
        { id: 'gold', stars: 50, icon: '🥇', name: 'Gold Moon', requirement: 'Earn 50 stars' },
        { id: 'diamond', stars: 100, icon: '💎', name: 'Diamond Star', requirement: 'Earn 100 stars' }
    ];

    const grid = document.getElementById('achievementsGrid');
    const stars = parseInt(localStorage.getItem('ramadanStars')) || 0;

    grid.innerHTML = achievements.map(achievement => {
        const unlocked = stars >= achievement.stars;
        return `
            <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-requirement">
                    ${unlocked ? '✅ Unlocked!' : achievement.requirement}
                </div>
            </div>
        `;
    }).join('');
}

// Display activity log
function displayActivity() {
    const activityList = document.getElementById('activityList');
    const activities = [];

    // Check what user has done
    const storyCount = countCompletedStories();
    const gameCount = countCompletedGames();
    const totalStars = parseInt(localStorage.getItem('ramadanStars')) || 0;

    if (storyCount > 0) {
        activities.push({
            icon: '📖',
            text: `Read ${storyCount} ${storyCount === 1 ? 'story' : 'stories'}`
        });
    }

    if (gameCount > 0) {
        activities.push({
            icon: '🎮',
            text: `Completed ${gameCount} ${gameCount === 1 ? 'game' : 'games'}`
        });
    }

    if (totalStars >= 10) {
        activities.push({
            icon: '🥉',
            text: 'Earned Bronze Moon achievement'
        });
    }

    if (totalStars >= 25) {
        activities.push({
            icon: '🥈',
            text: 'Earned Silver Moon achievement'
        });
    }

    if (totalStars >= 50) {
        activities.push({
            icon: '🥇',
            text: 'Earned Gold Moon achievement'
        });
    }

    if (activities.length === 0) {
        activityList.innerHTML = `
            <div class="empty-message">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🌙</div>
                <p>Start your Ramadan adventure to see your activities here!</p>
            </div>
        `;
        return;
    }

    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-text">${activity.text}</div>
        </div>
    `).join('');
}

// Helper: Count completed stories
function countCompletedStories() {
    let count = 0;
    const storyIds = ['thirsty-bird', 'generous-dates', 'lantern-light', 'honest-helper', 'moon-smile'];
    storyIds.forEach(id => {
        if (localStorage.getItem(`story_${id}`)) count++;
    });
    return count;
}

// Helper: Count completed games
function countCompletedGames() {
    let count = 0;
    const gameIds = ['memory', 'garden', 'quiz'];
    gameIds.forEach(id => {
        if (localStorage.getItem(`game_${id}`)) count++;
    });
    return count;
}
