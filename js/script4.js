// Topic Selection
const topicButtons = document.querySelectorAll('.topic-btn');
const forumTitle = document.getElementById('forum-title');
const postsContainer = document.getElementById('posts');

topicButtons.forEach(button => {
    button.addEventListener('click', () => {
        const topic = button.dataset.topic;
        forumTitle.textContent = `${topic.charAt(0).toUpperCase() + topic.slice(1)} Forum`;
        postsContainer.innerHTML = ''; // Clear previous posts
        loadPosts(topic);
    });
});

// Updated Sample Posts
const samplePosts = {
    stress: [
        "Too much homework—ugh, how do you deal?",
        "Chill music helps me relax a bit!",
        "Anyone feel like stress never ends?"
    ],
    anxiety: [
        "Class presentations freak me out—tips?",
        "Counting to 10 calms me down sometimes.",
        "Who else gets nervous for no reason?"
    ],
    'exam-pressure': [
        "Exams this week—send help!",
        "Quick breaks keep me sane, you?",
        "Studying all night—worth it or nah?"
    ]
};

function loadPosts(topic) {
    const posts = samplePosts[topic] || [];
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <p>${post}</p>
            <button class="helpful-btn">This helped me (<span>0</span>)</button>
        `;
        postsContainer.appendChild(postDiv);
    });

    // Add event listeners to "This helped me" buttons
    document.querySelectorAll('.helpful-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const countSpan = btn.querySelector('span');
            let count = parseInt(countSpan.textContent);
            countSpan.textContent = count + 1;
        });
    });
}

// Post Submission
const submitPost = document.getElementById('submit-post');
const newPost = document.getElementById('new-post');

submitPost.addEventListener('click', () => {
    const content = newPost.value.trim();
    if (content) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <p>${content}</p>
            <button class="helpful-btn">This helped me (<span>0</span>)</button>
        `;
        postsContainer.appendChild(postDiv);
        newPost.value = ''; // Clear textarea

        // Add event listener to the new "This helped me" button
        postDiv.querySelector('.helpful-btn').addEventListener('click', function() {
            const countSpan = this.querySelector('span');
            let count = parseInt(countSpan.textContent);
            countSpan.textContent = count + 1;
        });
    }
});

// Need Help Modal
const needHelpBtn = document.getElementById('need-help');
const modal = document.getElementById('help-modal');
const closeModal = document.querySelector('.close');

// Chatbox container (will be created dynamically)
let chatbox = null;

needHelpBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    if (chatbox) {
        chatbox.remove(); // Remove chatbox when modal closes
        chatbox = null;
    }
});

// Simulated AI responses for mental health issues
const mentalHealthReasons = [
    "Stress from schoolwork or exams can really pile up.",
    "Feeling anxious about grades or presentations is super common.",
    "Sometimes, lack of sleep messes with your mood.",
    "Social pressure or fitting in might be weighing on you.",
    "Big changes—like moving or starting college—can feel overwhelming."
];

// AI responses for Peer (friendly) and Professional (formal)
const aiResponses = {
    peer: {
        default: [
            "Heyy! I totally get that—wanna share more? 😊",
            "Aww, that sounds tough! Maybe a quick break could help? What do you think? 🌟",
            "I feel you! Have you tried something fun to take your mind off it, like watching a funny video? 🎥"
        ],
        dizzy: [
            "Oh no, feeling dizzy is the worst! 😓 Have you tried sipping some water or chilling for a bit?",
            "Dizzy, huh? Maybe lie down for a sec—that usually helps me! 🛋️ What’s been going on?",
            "Ugh, dizziness is rough! Have you eaten something today? Sometimes that helps! 🍎"
        ],
        okay: [
            "Cool, glad you think so! Let me know how it goes, okay? 😊",
            "Yay, that’s a start! Wanna tell me more about how you’re feeling? 🌈",
            "Nice! If you need more ideas, I’m here—what’s up? 😄"
        ],
        music: [
            "Yess, music is the best! 🎶 What kind do you like? I’m into chill vibes lately!",
            "Love that idea! Maybe some lo-fi beats? What’s your go-to song? 🎧",
            "Music always helps me too! Do you have a fave playlist to relax with? 🎵"
        ],
        stressed: [
            "Stress is the worst, right? 😩 Have you tried taking a quick walk or grabbing a snack?",
            "I totally get being stressed! Maybe watch a funny show to unwind—what do you like? 📺",
            "Ugh, stress can be a lot! Have you tried chatting with a friend to feel better? 💬"
        ],
        anxious: [
            "I get anxious too sometimes! 😟 Have you tried taking slow breaths? It really helps me!",
            "Anxiety is tough, huh? Maybe counting to 10 could calm you down—wanna try? 🌟",
            "Aww, I’m sorry you’re feeling anxious! Want to tell me more? I’m here for you! 💖"
        ]
    },
    professional: {
        default: [
            "I understand how you might feel. Would you like to share more about what’s been happening?",
            "That sounds challenging. Have you considered taking a brief pause to help manage your feelings?",
            "It’s common to feel this way at times. Have you found any strategies that help you cope?"
        ],
        dizzy: [
            "Feeling dizzy can be quite uncomfortable. I’d recommend ensuring you’re hydrated—have you had enough water today?",
            "Dizziness may be linked to stress or fatigue. Perhaps resting for a short while could help. Have you been able to rest?",
            "I’m sorry to hear you’re feeling dizzy. Deep breathing exercises might help stabilize you—would you like to try?"
        ],
        okay: [
            "I’m glad you feel that might work. Please let me know how that approach goes for you.",
            "That’s a positive step. Would you like to discuss any other concerns you might have?",
            "I’m pleased to hear that. If you’d like further guidance, I’m here to assist—what else is on your mind?"
        ],
        music: [
            "Listening to music can be a helpful way to relax. Do you have a particular genre that you find soothing?",
            "Music can be an effective tool for managing stress. I’d recommend something calming, like classical or ambient sounds—what do you prefer?",
            "That’s a good choice. Music can positively impact your mood. Do you have a favorite piece that helps you unwind?"
        ],
        stressed: [
            "Stress can be overwhelming. Have you considered journaling your thoughts to help process them?",
            "I understand how stress can affect you. Perhaps a short mindfulness exercise could help—would you like to try?",
            "Feeling stressed is challenging. Have you been able to identify any specific triggers that we can address?"
        ],
        anxious: [
            "Anxiety can be difficult to manage. I’d recommend trying a grounding technique, such as focusing on your breathing—would you like to try that?",
            "I’m sorry to hear you’re feeling anxious. Let’s explore what might be contributing to this—can you share more?",
            "Anxiety is a common experience. Perhaps a brief relaxation exercise could help—have you tried any techniques before?"
        ]
    }
};

// Function to get AI response based on user message and chat type
function getAIResponse(userMessage, type) {
    const message = userMessage.toLowerCase();
    const responses = type === 'peer' ? aiResponses.peer : aiResponses.professional;

    if (message.includes('dizzy')) {
        return responses.dizzy[Math.floor(Math.random() * responses.dizzy.length)];
    } else if (message.includes('okay') || message.includes('ok') || message.includes('might be')) {
        return responses.okay[Math.floor(Math.random() * responses.okay.length)];
    } else if (message.includes('music')) {
        return responses.music[Math.floor(Math.random() * responses.music.length)];
    } else if (message.includes('stress') || message.includes('stressed')) {
        return responses.stressed[Math.floor(Math.random() * responses.stressed.length)];
    } else if (message.includes('anxious') || message.includes('nervous')) {
        return responses.anxious[Math.floor(Math.random() * responses.anxious.length)];
    } else {
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
}

function createChatbox(type) {
    // Remove existing chatbox if any
    if (chatbox) {
        chatbox.remove();
    }

    // Create chatbox element
    chatbox = document.createElement('div');
    chatbox.classList.add('chatbox');
    chatbox.innerHTML = `
        <div class="chatbox-header">${type === 'peer' ? 'Peer Support Chat' : 'AI Professional Chat'}</div>
        <div class="chatbox-body">
            <div class="chat-messages">
                <div class="message ai-message">
                    <p>${type === 'peer' ? 'Heyy! I’m here to chat—here are some reasons you might be feeling this way! 😊' : 'Hello! I’m here to assist you. Here are some possible reasons for how you’re feeling:'}</p>
                    <ul>
                        ${mentalHealthReasons.map(reason => `<li>${reason}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="chat-input">
                <textarea placeholder="How are you feeling?"></textarea>
                <button class="send-btn">Send</button>
            </div>
        </div>
        <button class="close-chatbox">Close</button>
    `;
    document.body.appendChild(chatbox);

    const messagesContainer = chatbox.querySelector('.chat-messages');
    const textarea = chatbox.querySelector('textarea');
    const sendBtn = chatbox.querySelector('.send-btn');

    // Send message functionality
    sendBtn.addEventListener('click', () => {
        const userMessage = textarea.value.trim();
        if (userMessage) {
            // Add user message to chat
            const userMsgDiv = document.createElement('div');
            userMsgDiv.classList.add('message', 'user-message');
            userMsgDiv.innerHTML = `<p>${userMessage}</p>`;
            messagesContainer.appendChild(userMsgDiv);

            // Clear textarea
            textarea.value = '';

            // Simulate AI response after a short delay
            setTimeout(() => {
                const aiResponse = getAIResponse(userMessage, type);
                const aiMsgDiv = document.createElement('div');
                aiMsgDiv.classList.add('message', 'ai-message');
                aiMsgDiv.innerHTML = `<p>${aiResponse}</p>`;
                messagesContainer.appendChild(aiMsgDiv);

                // Scroll to bottom
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
    });

    // Allow sending message with Enter key
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    // Close chatbox functionality
    chatbox.querySelector('.close-chatbox').addEventListener('click', () => {
        chatbox.remove();
        chatbox = null;
    });
}

// Peer Chat Button
document.getElementById('peer-chat').addEventListener('click', () => {
    createChatbox('peer');
});

// Professional Help Button
document.getElementById('pro-help').addEventListener('click', () => {
    createChatbox('professional');
});

// Close modal when clicking outside (also removes chatbox)
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        if (chatbox) {
            chatbox.remove();
            chatbox = null;
        }
    }
});