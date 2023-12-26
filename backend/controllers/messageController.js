const User = require('../models/user');
const Message = require('../models/message');

// Obtener mensajes
exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.query;

    const messages = await Message.findAll({
      where: {
        usuario: [from, to],
      },
      order: [['timestamp', 'ASC']],
    });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.usuario === from,
        message: msg.contenido,
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

      return res.json({ msg: 'Mensaje agregado exitosamente.' });
    } else {
      return res.json({ msg: 'Error al agregar el mensaje a la base de datos.' });
    }
  } catch (ex) {
    console.error('Error al agregar mensaje:', ex);
    res.status(500).json({ error: 'Error interno del servidor al agregar el mensaje.' });
  }
};