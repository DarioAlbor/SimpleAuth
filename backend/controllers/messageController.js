const User = require('../models/user');
const Message = require('../models/message');
const { Op } = require('sequelize');

// Obtener todos los mensajes desde 1 día antes hasta hoy
exports.getMessages = async (req, res, next) => {
  try {
    // Obtener la fecha de hace 1 día
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const messages = await Message.findAll({
      where: {
        timestamp: {
          [Op.gte]: oneDayAgo,
          [Op.lte]: new Date(), // Fecha actual
        },
      },
      order: [['timestamp', 'ASC']],
    });

    const projectedMessages = messages.map((msg) => {
      return {
        usuario: msg.usuario,
        id: msg.id, // Utiliza el campo "id" en lugar de "idusuario"
        contenido: msg.contenido,
      };
    });

    res.json(projectedMessages);
  } catch (ex) {
    console.error('Error al obtener mensajes:', ex);
    res.status(500).json({ error: 'Error interno del servidor al obtener mensajes.' });
  }
};

// Agregar mensaje
exports.addMessage = async (req, res, next) => {
  try {
    const { idusuario, usuario, contenido, timestamp } = req.body;

    const data = await Message.create({
      idusuario: idusuario,
      usuario: usuario,
      contenido: contenido,
      timestamp: timestamp,
    });

    if (data) {
      // Emitir el nuevo mensaje a través de Socket.io con el nombre de usuario
      global.chatSocket.emit('newMessage', {
        fromSelf: usuario === req.query.from,
        message: contenido,
        username: usuario,  // Pasar el nombre de usuario al frontend
      });

      return res.status(200).send(); // OK
    } else {
      return res.status(500).send(); // Internal Server Error
    }
  } catch (ex) {
    console.error('Error al agregar mensaje:', ex);
    res.status(500).json({ error: 'Error interno del servidor al agregar el mensaje.' });
  }
};