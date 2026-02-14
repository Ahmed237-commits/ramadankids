// ===================================
// STORIES PAGE JAVASCRIPT
// Story content and display logic
// ===================================

// Story database
const stories = {
    'thirsty-bird': {
        title: 'The Thirsty Bird 🐦',
        illustration: '🐦💧🌞',
        paragraphs: [
            "It was a hot Ramadan afternoon. Little Sara was fasting for the first time! She felt thirsty, but she remembered why she was fasting – to feel grateful and help others.",
            "Sara looked out the window and saw a tiny bird hopping around, looking very thirsty. The bird couldn't find any water!",
            "Sara thought, \"I'm fasting, but this little bird needs help now!\" She asked her mom, and together they put a small bowl of water outside.",
            "The bird drank happily and chirped a beautiful \"Thank you!\" song. 🎵",
            "Sara smiled. Even while fasting, she could still do good deeds! That evening at iftar, her water tasted extra special because she had shared kindness."
        ],
        lesson: "Fasting teaches us to think about others and help them, even when it's hard for us. 💙"
    },

    'generous-dates': {
        title: 'The Generous Dates 🌴',
        illustration: '🌴🤝🌟',
        paragraphs: [
            "Omar loved dates! His favorite part of Ramadan was eating sweet, delicious dates at iftar time.",
            "One day, Omar's friend Ali came to visit. Ali's family didn't have many dates this Ramadan.",
            "Omar looked at his big box of dates. He really wanted to keep them all for himself. But then he remembered what his teacher said: \"The best people are those who share!\"",
            "Omar smiled and said, \"Ali! Take half of my dates for your family!\" Ali's eyes lit up with happiness. 😊",
            "That night, Omar's dates tasted even sweeter because he knew he made his friend happy. And guess what? The next day, Ali's dad brought Omar some delicious homemade cookies as a thank you!"
        ],
        lesson: "When we share what we have, everyone becomes happier! Sharing makes our hearts grow bigger. 💚"
    },

    'lantern-light': {
        title: 'The Light of the Lantern 🏮',
        illustration: '🏮✨🌙',
        paragraphs: [
            "Little Amira wanted to light her beautiful Ramadan lantern, but the candle wouldn't light. She tried and tried, but nothing worked.",
            "\"I want it NOW!\" Amira said sadly. Her dad smiled and said, \"Sometimes we need to be patient, my dear.\"",
            "Dad showed her that the candle was wet. \"Let's wait for it to dry,\" he said. Amira didn't want to wait, but she decided to try.",
            "While waiting, Amira helped her mom prepare iftar. She set the table and arranged the dates nicely. Time passed quickly!",
            "\"It's ready now!\" Dad called. The candle was dry! Together they lit the lantern, and it glowed beautifully. ✨ Amira realized that good things come to those who wait patiently."
        ],
        lesson: "Being patient helps us feel calm and happy. Good things are worth waiting for! 💡"
    },

    'honest-helper': {
        title: 'The Honest Helper 👦',
        illustration: '👦🎁💰',
        paragraphs: [
            "Yusuf was helping his dad clean the mosque before Ramadan prayers. While sweeping, he found a wallet with money inside! 💰",
            "Yusuf thought, \"I could buy so many toys with this money!\" But his heart felt heavy. He knew the money wasn't his.",
            "\"Dad, I found this wallet,\" Yusuf said. His dad smiled proudly. \"You did the right thing by telling me. Let's find the owner.\"",
            "They asked around the mosque. Soon, an old man came running. \"My wallet! I was so worried! Thank you, young man!\" The old man was so happy he almost cried.",
            "The man tried to give Yusuf a reward, but Yusuf said, \"It's okay! I'm happy I could help!\" That night, Yusuf felt like he had earned something even better than money – he felt proud and happy inside! 😊"
        ],
        lesson: "Being honest makes us feel good inside. It's better than any toy or candy! ⭐"
    },

    'moon-smile': {
        title: "The Moon's Smile 🌙",
        illustration: '🌙😊💜',
        paragraphs: [
            "Layla noticed that her grandmother looked sad. \"What's wrong, Grandma?\" she asked.",
            "\"Oh, my dear, I miss the beautiful moon of Ramadan. My eyes are too weak to see it clearly anymore,\" Grandma sighed.",
            "Layla had an idea! She got her crayons and drew a big, beautiful crescent moon with sparkles and stars all around it. 🎨",
            "\"Look, Grandma! The moon is here!\" Layla held up her drawing. Grandma's face lit up with the biggest smile!",
            "\"This is even more beautiful than the real moon because it's made with love!\" Grandma hugged Layla tight. That night, they hung the moon drawing on the wall, and it made Grandma smile every single day."
        ],
        lesson: "Small acts of kindness can make someone's whole day brighter! Making others happy makes us happy too. 💜"
    }
};

// Show story in modal
function showStory(storyId) {
    const story = stories[storyId];
    if (!story) return;

    const modal = document.getElementById('storyModal');
    const content = document.getElementById('storyContent');

    // Check if already read
    const storyKey = `story_${storyId}`;
    const alreadyRead = localStorage.getItem(storyKey);

    // Build story HTML
    let html = `
        <button class="close-btn" onclick="closeStory()">✕</button>
        <h2>${story.title}</h2>
        <div class="story-illustration">${story.illustration}</div>
    `;

    // Add paragraphs
    story.paragraphs.forEach((paragraph, index) => {
        html += `<p>${paragraph}</p>`;

        // Add illustrations between paragraphs
        if (index === 1) {
            html += `<div class="story-illustration">${story.illustration}</div>`;
        }
    });

    // Add lesson box
    html += `
        <div class="story-lesson-box">
            <h3>✨ What We Learned ✨</h3>
            <p>${story.lesson}</p>
        </div>
    `;

    // Add buttons
    if (!alreadyRead) {
        html += `
            <div class="story-buttons">
                <button class="btn btn-primary" onclick="finishStory('${storyId}')">
                    I Finished! Earn a Star! ⭐
                </button>
                <button class="btn btn-secondary" onclick="closeStory()">
                    Close
                </button>
            </div>
        `;
    } else {
        html += `
            <div class="story-buttons">
                <p style="color: var(--fresh-green); font-weight: 700; font-size: 1.2rem;">
                    ✅ You already read this story and earned your star!
                </p>
                <button class="btn btn-secondary" onclick="closeStory()">
                    Close
                </button>
            </div>
        `;
    }

    content.innerHTML = html;
    modal.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close story modal
function closeStory() {
    const modal = document.getElementById('storyModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Finish story and earn star
function finishStory(storyId) {
    const storyKey = `story_${storyId}`;

    // Mark as read
    localStorage.setItem(storyKey, 'true');

    // Add star
    addStars(1);

    // Show completion message
    const content = document.getElementById('storyContent');
    content.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 6rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="color: var(--moonlight-purple); margin-bottom: 1rem;">Amazing!</h2>
            <p style="font-size: 1.5rem; color: var(--sunset-orange); font-weight: 700; margin-bottom: 2rem;">
                You earned a star! ⭐
            </p>
            <div class="story-buttons">
                <button class="btn btn-primary" onclick="closeStory()">
                    Read Another Story 📖
                </button>
                <button class="btn btn-secondary" onclick="goHome()">
                    Go Home 🏠
                </button>
            </div>
        </div>
    `;
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('storyModal');
    if (e.target === modal) {
        closeStory();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeStory();
    }
});
