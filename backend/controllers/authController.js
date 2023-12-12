const User = require('../models/user');
const passport = require('passport');
const mailer = require('../utils/mailer');

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const user = await User.create({ firstName, lastName, email, password, role: 'Cliente' });

        // Enviar correo de bienvenida
        await mailer.sendWelcomeEmail(email);

        res.json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

  exports.checkEmail = async (req, res) => {
    try {
      const { email } = req.params;

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.json({ exists: 'Si' });
      }

      return res.json({ exists: 'No' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al verificar el correo electrónico' });
    }
  };

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Guarda el ID del usuario en la sesión
        req.session.userId = user.id;

        res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(); // Destruye la sesión al cerrar sesión
    res.json({ message: 'Cierre de sesión exitoso' });
};