// controllers/userController.js
const User = require('../models/user');

exports.getUserInfo = async (req, res) => {
    try {
        // Verifica si el usuario está autenticado
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }

        // Obtiene el ID del usuario desde la sesión
        const userId = req.session.userId;

        // Busca al usuario por ID
        const user = await User.findByPk(userId, {
            attributes: ['id', 'firstName', 'lastName', 'email'],
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la información del usuario' });
    }
};

exports.getUsername = async (req, res) => {
    try {
        // Verifica si el usuario está autenticado
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }

        // Obtiene el ID del usuario desde la sesión
        const userId = req.session.userId;

        // Busca al usuario por ID y devuelve el nombre de usuario
        const user = await User.findByPk(userId, { attributes: ['firstName'] });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ username: user.firstName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el nombre de usuario' });
    }
};


exports.getRole = async (req, res) => {
    try {
        // Verifica si el usuario está autenticado
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }

        // Obtiene el ID del usuario desde la sesión
        const userId = req.session.userId;

        // Busca al usuario por ID y devuelve el rol
        const user = await User.findByPk(userId, { attributes: ['role'] });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el rol del usuario' });
    }
};