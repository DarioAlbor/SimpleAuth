const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Ruta para agregar un mensaje
router.post('/addmsg', messageController.addMessage);

// Ruta para obtener mensajes
router.get('/getmsg', messageController.getMessages);

module.exports = router;
