// routes/messages.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Ruta para crear un nuevo mensaje
router.post('/', async (req, res) => {
  const { userId, content } = req.body;

  try {
    const newMessage = await messageController.createMessage(userId, content);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el mensaje.' });
  }
});

module.exports = router;
