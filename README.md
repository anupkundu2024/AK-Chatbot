# Node.js Chatbot with Express and MongoDB

A simple chatbot backend API built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Clone the repository or download the files

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   - Rename `.env.example` to `.env` (if not already done)
   - Update the MongoDB connection string in `.env` if needed

## Running the Application

1. Start the server
   ```
   npm start
   ```
   or for development with auto-restart:
   ```
   npm run dev
   ```

2. The server will run on http://localhost:5000 by default

## API Endpoints

- **GET /api/messages** - Get all messages
- **POST /api/messages** - Create a new message
  - Required fields in request body: `user`, `content`
- **POST /api/chat** - Process user input and return chatbot response
  - Required field in request body: `userInput`
  - Returns both the user message and bot response

## Project Structure

```
├── .env                  # Environment variables
├── index.js              # Entry point for the application
├── models/               # Database models
│   └── Message.js        # Message model schema
└── routes/               # API routes
    └── api/
        ├── messages.js   # Message routes
        └── chat.js       # Chat endpoint for bot interaction
```

## Adding a Development Script

To add nodemon for development, update your package.json:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Then install nodemon as a dev dependency:

```
npm install --save-dev nodemon
```