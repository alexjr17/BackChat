// routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();
const secret_key =  "d8z1p7nhunyw4sj173pj";

// Ruta de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, secret_key, { expiresIn: '1h' });

  res.json({ token, user: { id: user.id, username: user.username, name: user.name, role: user.role } });
});

// Ruta de registro
router.post('/register', async (req, res) => {
  const { username, name, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, name, password: hashedPassword, role });

  const token = jwt.sign({ id: newUser.id, username: newUser.username }, secret_key, { expiresIn: '1h' });

  res.json({ token, user: { id: newUser.id, username: newUser.username, name: newUser.name, role: newUser.role } });
});

module.exports = router;
