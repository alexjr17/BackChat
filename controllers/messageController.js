const Message = require('../models/message');
const User = require('../models/user');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ include: User });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const message = await Message.create({ content, userId });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
