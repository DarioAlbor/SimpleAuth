const User = require('../models/user');
const mailer = require('../utils/mailer');
const { generateToken } = require('../utils/token');
const { validateToken } = require('../utils/token');

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

        // Actualiza isActive a "1" al iniciar sesión
        user.isActive = 1;
        await user.save();

        // Guarda el ID del usuario en la sesión
        req.session.userId = user.id;

        res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};


exports.logout = async (req, res) => {
    try {
        // Verifica si el usuario está autenticado
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }

        // Obtiene el ID del usuario desde la sesión
        const userId = req.session.userId;

        // Busca al usuario por ID y actualiza isActive a "0"
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualiza isActive a "0"
        user.isActive = 0;
        await user.save();

        req.session.destroy(); // Destruye la sesión al cerrar sesión
        res.json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
          return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }

      const resetToken = generateToken({ email: user.email, userId: user.id });

      // Guarda el token de restablecimiento en la base de datos
      await user.update({ resetToken });

      // Envía el correo electrónico de restablecimiento
      await mailer.sendPasswordResetEmail(email, resetToken);

      res.json({
          success: true,
          message: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.',
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          message: 'Error al procesar la solicitud de restablecimiento de contraseña.',
      });
  }
};

exports.validateResetToken = async (req, res) => {
  const { token } = req.body;

  try {
    // Valida el token aquí según tus criterios
    const isValid = validateToken(token);

    res.json({ valid: isValid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ valid: false });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Usuario no encontrado.' });
    }

    // Verifica la validez y el tiempo de expiración del token si es necesario
    // const decodedToken = verifyToken(token);
    // if (!decodedToken) {
    //     return res.status(400).json({ success: false, message: 'Token de restablecimiento no válido o ha expirado.' });
    // }

    // Actualiza la contraseña en la base de datos
    await user.update({ password: newPassword });

    res.json({ success: true, message: 'Contraseña restablecida con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al restablecer la contraseña.' });
  }
};