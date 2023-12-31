// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para obtener informaci�n del usuario (id, firstName, lastName, email)
router.get('/getUserInfo', userController.getUserInfo);
// Ruta para obtener el nombre de usuario
    router.get('/getUsername', userController.getUsername);

    module.exports = router;
// Ruta para obtener el rol del usuario
router.get('/getRole', userController.getRole);
// Ruta para verificar si el usuario está activo
router.get('/isUserActive', userController.isUserActive);
