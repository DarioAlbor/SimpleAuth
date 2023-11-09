// controllers/userController.js
const User = require('../models/user');

exports.getUsername = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ username: user.firstName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el nombre de usuario' });
  }
};

exports.getProtectedData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    // Aquí puedes realizar cualquier acción que requiera un usuario autenticado

    res.json({ message: 'Acceso autorizado', user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener datos protegidos' });
  }
};
