const { Message } = require('../models');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.postMessage = async (req, res) => {
  const { content, sender, role } = req.body;
  try {
    const message = await Message.create({ content, sender, role });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};