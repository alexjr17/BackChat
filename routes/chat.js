const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, messageController.getAllMessages);
router.post('/', authMiddleware, messageController.createMessage);

module.exports = router;
