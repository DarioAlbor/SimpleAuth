// controllers/userController.js
const User = require('../models/user');

// Variable para almacenar la información del usuario en caché
let cachedUserInfo = {};

exports.isUserActive = async (req, res) => {
    try {
        // Verifica si el usuario está autenticado
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }

        // Obtiene el ID del usuario desde la sesión
        const userId = req.session.userId;

        // Busca al usuario en caché
        const cachedUser = cachedUserInfo[userId];

        // Verifica si la información del usuario está en caché
        if (cachedUser && cachedUser.hasOwnProperty('isActive')) {
            return res.json({ isActive: cachedUser.isActive });
        }

        // Busca al usuario por ID y devuelve si está activo o no
        const user = await User.findByPk(userId, { attributes: ['isActive'] });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Almacena la información del usuario en caché
        cachedUserInfo[userId] = { isActive: user.isActive };

        res.json({ isActive: user.isActive });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al verificar si el usuario está activo' });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        // Verifica si el usuario está autenticado
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }

        // Obtiene el ID del usuario desde la sesión
        const userId = req.session.userId;

        // Busca al usuario en caché
        const cachedUser = cachedUserInfo[userId];

        // Verifica si la información del usuario está en caché
        if (cachedUser) {
            return res.json({ user: cachedUser });
        }

        // Busca al usuario por ID
        const user = await User.findByPk(userId, {
            attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'isActive'],
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Almacena la información del usuario en caché
        cachedUserInfo[userId] = user;

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la información del usuario' });
    }
};

let cachedUsernames = {};

exports.getUsername = async (req, res) => {
    try {
        // Verifica si el usuario está autenticado
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }

        // Obtiene el ID del usuario desde la sesión
        const userId = req.session.userId;

        // Busca el nombre de usuario en caché
        const cachedUsername = cachedUsernames[userId];

        // Verifica si el nombre de usuario está en caché
        if (cachedUsername) {
            return res.json({ username: cachedUsername });
        }

        // Busca al usuario por ID y devuelve el nombre de usuario
        const user = await User.findByPk(userId, { attributes: ['firstName'] });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Almacena el nombre de usuario en caché
        cachedUsernames[userId] = user.firstName;

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