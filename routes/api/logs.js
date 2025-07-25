const express = require('express');
const router = express.Router();
const Message = require('../../models/Message');

// @route   GET api/logs
// @desc    Get all stored conversations
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Fetch all messages from the database, sorted by timestamp
    const conversations = await Message.find().sort({ timestamp: 1 });
    
    // Group messages by conversation
    // This is a simple implementation that returns all messages
    // You could enhance this to group by session or conversation ID if needed
    
    res.json(conversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;