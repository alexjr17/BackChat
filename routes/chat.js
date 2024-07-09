const express = require('express');
const { Message, User } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Obtener todos los mensajes
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Incluir la información del usuario que creó el mensaje
    const messages = await Message.findAll({
      include: User
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Enviar un nuevo mensaje
router.post('/', authMiddleware, async (req, res) => {
  const { content } = req.body;
  const userId = req.userId; // El id del usuario que está autenticado

  try {
    const message = await Message.create({ content, userId });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
