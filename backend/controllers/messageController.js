// /controllers/messageController.js
const { Message } = require('../models/message');
const { User } = require('../models/user');

const createMessage = async (userId, content) => {
  try {
    // Buscar al usuario por su ID
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Crear el mensaje asociándolo al usuario
    const message = await Message.create({
      usuario: user.firstName, // Completar con el firstName del usuario
      contenido: content,
    });

    // Asociar el mensaje al usuario
    await message.setUser(user);

    return message;
  } catch (error) {
    console.error('Error al crear el mensaje:', error);
    throw error;
  }
};

module.exports = { createMessage };
