AmplifyEase Chatbot Widget

A lightweight, embeddable floating chatbot widget built using vanilla JavaScript.
Designed for SaaS websites to handle FAQs, capture leads, and forward free-form queries to a backend chat or AI API.

This project focuses on clarity, state-driven logic, and zero framework dependency.

Features

Floating chat button with open and close behavior

Expandable and collapsible chat window

Menu-based guided conversation

Quick reply buttons for common actions

Lead capture flow (Name and Email)

Free-text chat powered by backend API

Simple state machine for conversation control

No external libraries or frameworks

Conversation Flow

The chatbot operates using a state-based flow to keep logic predictable and easy to extend.

MENU
 ├── INFO (Pricing / Features)
 │     └── Contact Prompt
 ├── CONTACT
 │     ├── ASK_NAME
 │     └── ASK_EMAIL
 └── FREE_CHAT


Each user interaction updates the conversationState, ensuring clean transitions and minimal edge cases.

Project Structure
chatbot/
├── index.html
├── styles.css
└── chatbot.js


chatbot.js
Contains all logic: state management, UI rendering, and API communication.

styles.css
Handles layout, animations, and responsiveness.

index.html
Minimal markup required to load the widget.

How It Works

User clicks the floating chat button

Chat window opens and shows main menu options

User selects an option or enters free text

Conversation state updates based on input

For free chat, the message is sent to a backend API

Bot response is rendered in the UI

The logic is intentionally kept simple so it can be:

debugged easily

extended without refactoring

understood by non-framework developers

API Integration

Free chat messages are sent to a backend endpoint:

POST http://127.0.0.1:8000/chat

Expected Request
{
  "message": "User query text"
}

Expected Response
{
  "reply": "Bot response text"
}


You can connect this endpoint to:

a FastAPI backend

an AI model

a rule-based support system

Customization

You can easily customize:

Branding text (assistant name)

Menu options

Knowledge base responses

Validation rules

Backend API URL

UI styling and animations

All configurations are centralized and easy to modify.

Why Vanilla JavaScript?

No framework lock-in

Easy to embed on any website

Faster load time

Full control over DOM and logic

Ideal for widgets and micro-frontends

Use Cases

SaaS landing pages

Internal tools

Lead generation widgets

Customer support assistants

AI chat integrations

License

This project is open for personal and commercial use.
Modify and extend it freely to fit your needs.# floating-chat-widget
