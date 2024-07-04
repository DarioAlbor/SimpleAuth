const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Traer todos los usuarios registrados
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'firstName lastName email imgProfile isactive');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear usuario
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, imgProfile } = req.body;
  try {
    // Hash
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      imgProfile
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Inicio de sesión
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Actualizar isactive con expiración de 1 hora
    user.isactive = true;
    await user.save();

    // Cron
    setTimeout(async () => {
      user.isactive = false;
      await user.save();
    }, 3600000); // 1 hora

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener información del usuario activo
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar información del usuario
exports.updateUserInfo = async (req, res) => {
  const { imgProfile, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (imgProfile) {
      user.imgProfile = imgProfile;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({ message: 'Información actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cerrar sesión
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.isactive = false;
    await user.save();

    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};