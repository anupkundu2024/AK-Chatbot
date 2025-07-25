const express = require('express');
const router = express.Router();
const Message = require('../../models/Message');

// @route   GET api/messages
// @desc    Get all messages
// @access  Public
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/messages
// @desc    Create a new message
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { user, content } = req.body;
    
    // Create new message
    const newMessage = new Message({
      user,
      content
    });
    
    // Save message to database
    const message = await newMessage.save();
    
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;