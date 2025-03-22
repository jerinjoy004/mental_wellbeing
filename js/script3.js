// Simulated user data with mental health scores
let users = {
  "alice": { name: "Alice", mentalHealthScore: 70 },
  "bob": { name: "Bob", mentalHealthScore: 40 },
  "charlie": { name: "Charlie", mentalHealthScore: 20 },
  "david": { name: "David", mentalHealthScore: 60 },
  "emma": { name: "Emma", mentalHealthScore: 30 }
};

// Simulated friends list for the current user (start empty)
let friends = [];

// Threshold for mental health score to trigger a notification
const mentalHealthThreshold = 50;

// AI-generated conversation starters
const conversationStarters = [
  "Hey, I noticed you’ve seemed a bit quiet lately—want to chat?",
  "I’m here for you if you’re feeling overwhelmed—how’s your day going?",
  "You’ve been on my mind! How are you holding up with everything?",
  "Hey, I know things can get tough—wanna talk about what’s been going on?",
  "I’m always here if you need to vent—how are you feeling today?"
];

// Simulated friend responses for the chat
const friendResponses = {
  default: [
      "Thanks for checking in! I’ve been feeling a bit stressed lately.",
      "I appreciate that! Yeah, I could use someone to talk to.",
      "Hey, thanks for reaching out! I’ve been struggling a bit."
  ],
  okay: [
      "I’m feeling a bit better now, thanks for asking!",
      "Things are starting to look up—thanks for being there!",
      "I’m okay now, just needed a little support. Thanks!"
  ],
  stressed: [
      "Yeah, I’ve been really stressed with schoolwork. Any tips?",
      "I’m so stressed right now—exams are killing me!",
      "Stress is getting to me. How do you handle it?"
  ],
  thanks: [
      "Thanks for being there—it means a lot!",
      "I really appreciate your support, thanks!",
      "Thanks for checking in, I feel a bit better already!"
  ]
};

// Function to get a friend’s response based on the user’s message
function getFriendResponse(userMessage) {
  const message = userMessage.toLowerCase();
  if (message.includes('okay') || message.includes('better')) {
      return friendResponses.okay[Math.floor(Math.random() * friendResponses.okay.length)];
  } else if (message.includes('stress') || message.includes('stressed')) {
      return friendResponses.stressed[Math.floor(Math.random() * friendResponses.stressed.length)];
  } else if (message.includes('thanks') || message.includes('thank you')) {
      return friendResponses.thanks[Math.floor(Math.random() * friendResponses.thanks.length)];
  } else {
      return friendResponses.default[Math.floor(Math.random() * friendResponses.default.length)];
  }
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Add Friend Functionality
const addFriendBtn = document.getElementById('add-friend-btn');
const friendUsernameInput = document.getElementById('friend-username');
const friendsList = document.getElementById('friends-list');

addFriendBtn.addEventListener('click', () => {
  const username = friendUsernameInput.value.trim().toLowerCase();
  console.log("Attempting to add friend:", username); // Debug log
  if (username && !friends.includes(username)) {
      console.log("Adding friend:", username); // Debug log
      // If the user doesn't exist, create a new user entry
      if (!users[username]) {
          const displayName = capitalizeFirstLetter(username);
          // Assign a random mental health score between 20 and 80 for demo purposes
          const mentalHealthScore = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
          users[username] = { name: displayName, mentalHealthScore };
          console.log(`Created new user: ${username} (${displayName}, Score: ${mentalHealthScore})`);
      }
      friends.push(username);
      friendUsernameInput.value = ''; // Clear input
      displayFriends();
  } else if (!username) {
      alert("Please enter a username!");
  } else if (friends.includes(username)) {
      alert("This user is already your friend!");
  }
});

// Display Friends List
function displayFriends() {
  console.log("Displaying friends:", friends); // Debug log
  friendsList.innerHTML = '';
  friends.forEach(username => {
      const user = users[username];
      const needsSupport = user.mentalHealthScore < mentalHealthThreshold;
      const li = document.createElement('li');
      li.innerHTML = `
          <span>${user.name}</span>
          <span class="status">${needsSupport ? 'Might need support' : 'Doing well'}</span>
          ${needsSupport ? '<button onclick="showConversationStarters(\'' + username + '\')">Check In</button>' : ''}
      `;
      friendsList.appendChild(li);
  });
}

// Conversation Starters Modal
const modal = document.getElementById('conversation-modal');
const closeModal = document.querySelector('.close');
const modalFriendName = document.getElementById('modal-friend-name');
const conversationStartersDiv = document.getElementById('conversation-starters');
const startChatBtn = document.getElementById('start-chat-btn');

let currentFriendUsername = null; // Store the current friend's username

function showConversationStarters(username) {
  currentFriendUsername = username; // Store the username for use in the chatbox
  const user = users[username];
  modalFriendName.textContent = `Support ${user.name}`;
  conversationStartersDiv.innerHTML = '';
  conversationStarters.forEach(starter => {
      const p = document.createElement('p');
      p.textContent = starter;
      p.addEventListener('click', () => {
          // Highlight selected starter
          conversationStartersDiv.querySelectorAll('p').forEach(p => p.style.background = '#f0f0f0');
          p.style.background = '#d0d0d0';
          startChatBtn.dataset.message = starter;
      });
      conversationStartersDiv.appendChild(p);
  });
  modal.style.display = 'block';
}

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
      modal.style.display = 'none';
  }
});

// Chatbox container (will be created dynamically)
let chatbox = null;

function createChatbox(friendUsername, initialMessage) {
  // Remove existing chatbox if any
  if (chatbox) {
      chatbox.remove();
  }

  const friend = users[friendUsername];

  // Create chatbox element
  chatbox = document.createElement('div');
  chatbox.classList.add('chatbox');
  chatbox.innerHTML = `
      <div class="chatbox-header">Chat with ${friend.name}</div>
      <div class="chatbox-body">
          <div class="chat-messages">
              <div class="message user-message">
                  <p>${initialMessage}</p>
              </div>
          </div>
          <div class="chat-input">
              <textarea placeholder="Type a message..."></textarea>
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

          // Simulate friend's response after a short delay
          setTimeout(() => {
              const friendResponse = getFriendResponse(userMessage);
              const friendMsgDiv = document.createElement('div');
              friendMsgDiv.classList.add('message', 'friend-message');
              friendMsgDiv.innerHTML = `<p>${friendResponse}</p>`;
              messagesContainer.appendChild(friendMsgDiv);

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

startChatBtn.addEventListener('click', () => {
  const message = startChatBtn.dataset.message || "Hey, just checking in!";
  if (currentFriendUsername) {
      createChatbox(currentFriendUsername, message);
      modal.style.display = 'none'; // Close the modal
  }
});

// Initialize friends list (start empty)
displayFriends();