# Floating Chat Widget

A lightweight, embeddable floating chat widget built with vanilla JavaScript, designed for modern web applications that need guided conversations, lead capture, and backend-powered chat without framework overhead.

This project emphasizes clean state management, predictable UI behavior, and easy extensibility.

## Overview

The Floating Chat Widget provides a reusable chat interface that can be embedded into any website. It supports menu-based interactions, contact workflows, and free-text conversations routed to a backend API.

The entire widget is implemented **without external libraries**, making it fast, portable, and easy to understand.

## Key Features

- Floating chat button with open and close behavior
- Expandable and collapsible chat window
- Menu-driven conversation flow
- Quick reply buttons for common actions
- Lead capture flow (name and email)
- Free-form chat with backend API integration
- Simple, readable state-based logic
- No frameworks or dependencies

## Conversation Architecture

The chatbot operates using a **state-driven conversation model**. Each user interaction updates a single source of truth: `conversationState`.
```
MENU
 ├── INFO (Pricing / Features)
 │     └── Contact Prompt
 ├── CONTACT
 │     ├── ASK_NAME
 │     └── ASK_EMAIL
 └── FREE_CHAT
```

This approach avoids deeply nested conditionals and makes future extensions straightforward.

## Project Structure
```
chatbotWidget/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── chatbot.js
│
├── backend/
│   └── .gitkeep
│
├── .gitignore
└── README.md
```

### Folder Breakdown

#### `frontend/`

Contains the complete chatbot UI:
- DOM creation
- State handling
- User interaction logic
- API communication

#### `backend/`

Reserved for server-side logic (e.g. FastAPI, Node.js). Currently tracked using `.gitkeep` until backend code is added.

## How It Works

1. User clicks the floating chat button
2. Chat window opens with main menu options
3. User selects a menu option or types a message
4. Conversation state updates accordingly
5. For free chat, the message is sent to a backend API
6. Bot response is rendered dynamically in the UI

All UI updates are handled **programmatically** for full control.

## Backend API Integration

Free-text messages are sent to a configurable backend endpoint.

### Endpoint
```
POST http://127.0.0.1:8000/chat
```

### Request Payload
```json
{
  "message": "User input text"
}
```

### Response Payload
```json
{
  "reply": "Bot response text"
}
```

This backend can be powered by:
- FastAPI
- Node.js
- AI / LLM services
- Rule-based chat engines

## Customization Guide

You can easily modify:

- Assistant name and branding text
- Menu options and labels
- Knowledge base responses
- Input validation rules
- Backend API URL
- UI styles and animations

All core configurations are centralized for easy updates.

## Why Vanilla JavaScript?

- No framework lock-in
- Faster load time
- Easier embedding across platforms
- Full control over DOM and state
- Ideal for widgets and micro-frontends

This project prioritizes **clarity over abstraction**.

## Use Cases

- SaaS landing pages
- Lead generation widgets
- Customer support interfaces
- Internal tools
- AI-powered chat integrations

## Future Improvements

- Persistent chat history
- Authentication-based personalization
- Theming support
- Accessibility enhancements
- WebSocket-based real-time responses

## License

This project is open for personal and commercial use. You are free to modify, extend, and integrate it into your own applications.
