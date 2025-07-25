const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");

// @route   POST api/chat
// @desc    Process user input and return chatbot response
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { userInput } = req.body;

    if (!userInput) {
      return res.status(400).json({ msg: "User input is required" });
    }

    // Save user message to database
    const userMessage = new Message({
      user: "user",
      content: userInput,
    });
    await userMessage.save();

    // Generate bot response based on user input
    let botResponse;
    const input = userInput.toLowerCase().trim();

    // Enhanced response logic
    if (input.includes("hello") || input.includes("hi")) {
      botResponse = "Hello! How can I assist you today?";
    } else if (input.includes("how are you")) {
      botResponse = "I'm doing well, thank you for asking! How can I help you?";
    } else if (input.includes("bye") || input.includes("goodbye")) {
      botResponse = "Goodbye! Have a great day!";
    } else if (input.includes("thank")) {
      botResponse =
        "You're welcome! Is there anything else I can help you with?";
    } else if (input.includes("help")) {
      botResponse =
        "I can help you with general questions and conversation. What would you like to know?";
    } else if (input.includes("name")) {
      botResponse = "I'm AK ChatBot, your friendly AI assistant!";
    } else if (input.includes("weather")) {
      botResponse =
        "I apologize, but I don't have access to real-time weather data. You might want to check a weather service for that information.";
    } else if (input.includes("time")) {
      botResponse = `The current time is ${new Date().toLocaleTimeString()}.`;
    } else {
      // Default response for unrecognized inputs
      botResponse =
        "I understand you're saying something about " +
        input +
        ". Could you please elaborate or rephrase your question?";
    }

    // Save bot response to database
    const botMessage = new Message({
      user: "bot",
      content: botResponse,
    });
    await botMessage.save();

    // Return both messages
    res.json({
      userMessage,
      botMessage,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/messages
// @desc    Get all messages (currently returns empty array)
// @access  Public
router.get("/messages", async (req, res) => {
  try {
    // For now, return an empty array
    res.json([]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
