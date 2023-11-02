const User = require('../models/user'); // Asumiendo que tienes un modelo de usuario

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // Aquí deberías agregar la lógica para guardar el usuario en la base de datos
    const user = await User.create({ firstName, lastName, email, password });
    res.json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};
