const { Message, User } = require('../models');

// Obtener todos los mensajes
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: User
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Enviar un nuevo mensaje
const sendMessage = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId; // El id del usuario que está autenticado

  try {
    const message = await Message.create({ content, userId });
    const fullMessage = await Message.findOne({
      where: { id: message.id },
      include: User
    });
    res.status(201).json(fullMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllMessages,
  sendMessage
};
