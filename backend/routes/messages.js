// routes/messages.js

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Ruta para obtener todos los mensajes
router.get('/', async (req, res) => {
  try {
    const messages = await messageController.getMessages();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los mensajes.' });
  }
});

// Ruta para crear un nuevo mensaje
router.post('/', async (req, res) => {
  const { senderId, text } = req.body;

  try {
    const newMessage = await messageController.createMessage(senderId, text);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el mensaje.' });
  }
});

module.exports = router;
