// STATE
let isOpen = false;
let isExpanded = false;
let hasWelcomed = false;

let conversationState = "MENU";
// MENU

let userData = {
  name: "",
  email: ""
};

// DATA
const knowledgeBase = {
  pricing: "Our pricing starts at ₹10,000/month depending on usage.",
  features: "We offer workflow automation, analytics, and integrations."
};

const API_URL = "http://127.0.0.1:8000/chat";

// FLOATING BUTTON
const chatButton = document.createElement("div");
chatButton.id = "chatbot-button";
chatButton.innerHTML = "💬";
document.body.appendChild(chatButton);

// CHAT WINDOW
const chatWindow = document.createElement("div");
chatWindow.id = "chatbot-window";
chatWindow.style.display = "none";

chatWindow.innerHTML = `
  <div class="chat-header">
    <span>AmplifyEase Assistant</span>
    <div class="chat-actions">
      <button id="chat-maximize">⛶</button>
      <button id="chat-close">✕</button>
    </div>
  </div>

  <div class="chat-body"></div>
  <div class="chat-options"></div>

  <div class="chat-input hidden">
    <input id="chat-input" type="text" placeholder="Type your message..." />
    <button id="send-btn">Send</button>
  </div>
`;

document.body.appendChild(chatWindow);

// ELEMENTS
const chatBody = chatWindow.querySelector(".chat-body");
const optionsArea = chatWindow.querySelector(".chat-options");
const chatInputBox = chatWindow.querySelector(".chat-input");

const input = chatWindow.querySelector("#chat-input");
const sendBtn = chatWindow.querySelector("#send-btn");
const closeBtn = chatWindow.querySelector("#chat-close");
const maximizeBtn = chatWindow.querySelector("#chat-maximize");

// OPEN / CLOSE
chatButton.onclick = () => {
  chatWindow.style.display = "flex";
  isOpen = true;

  if (!hasWelcomed) {
    addBotMessage("👋 Hi! How can I help you today?");
    showMainOptions();
    hasWelcomed = true;
  }
};

closeBtn.onclick = () => {
  chatWindow.style.display = "none";
  isOpen = false;
};

// EXPAND / MINIMIZE
maximizeBtn.onclick = () => {
  isExpanded = !isExpanded;

  if (isExpanded) {
    chatWindow.classList.add("expanded");
    maximizeBtn.innerText = "▢";
  } else {
    chatWindow.classList.remove("expanded");
    maximizeBtn.innerText = "⛶";
  }
};

// HELPERS
function addBotMessage(text) {
  const msg = document.createElement("div");
  msg.className = "bot-message";
  msg.innerText = text;
  chatBody.appendChild(msg);
  scrollToBottom();
}

function addUserMessage(text) {
  const msg = document.createElement("div");
  msg.className = "user-message";
  msg.innerText = text;
  chatBody.appendChild(msg);
  scrollToBottom();
}

function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

function showInput() {
  chatInputBox.classList.remove("hidden");
  input.focus();
}

function hideInput() {
  chatInputBox.classList.add("hidden");
  input.value = "";
}

function clearOptions() {
  optionsArea.innerHTML = "";
}

// QUICK REPLIES
function showOptions(options) {
  clearOptions();

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option.label;

    btn.onclick = () => {
      clearOptions();
      handleOption(option);
    };

    optionsArea.appendChild(btn);
  });
}

// MAIN MENU
function showMainOptions() {
  hideInput();
  conversationState = "MENU";

  showOptions([
    { label: "Pricing", type: "INFO", key: "pricing" },
    { label: "Features", type: "INFO", key: "features" },
    { label: "Contact Support", type: "CONTACT" },
    { label: "Other", type: "OTHER" }
  ]);
}

// OPTION HANDLING
function handleOption(option) {
  addUserMessage(option.label);

  if (option.type === "INFO") {
    addBotMessage(knowledgeBase[option.key]);
    addBotMessage("Would you like us to contact you?");
    showOptions([
      { label: "Yes", type: "CONTACT" },
      { label: "No", type: "END" }
    ]);
    return;
  }

  if (option.type === "CONTACT") {
    conversationState = "ASK_NAME";
    addBotMessage("Sure! What’s your name?");
    showInput();
    return;
  }

  if (option.type === "OTHER") {
    conversationState = "FREE_CHAT";
    addBotMessage("Please describe your query. I’m listening 👂");
    showInput();
    return;
  }

  if (option.type === "END") {
    addBotMessage("Alright 🙂");
    showMainOptions();
  }
}

// SEND MESSAGE
sendBtn.onclick = sendMessage;

input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = "";

  if (conversationState === "ASK_NAME") {
    userData.name = text;
    conversationState = "ASK_EMAIL";
    addBotMessage(`Thanks ${userData.name}! What’s your email?`);
    return;
  }

  if (conversationState === "ASK_EMAIL") {
    if (!text.includes("@")) {
      addBotMessage("Please enter a valid email.");
      return;
    }

    userData.email = text;
    addBotMessage("Thanks! Our support team will reach out soon.");
    showMainOptions();
    return;
  }

  if (conversationState === "FREE_CHAT") {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      addBotMessage(data.reply);
    } catch {
      addBotMessage("Something went wrong.\nPlease check your internet connection.");
    }

    showMainOptions();
  }
}
