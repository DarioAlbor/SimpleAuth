    const express = require('express');
    const router = express.Router();
    const authController = require('../controllers/authController');

    router.post('/', authController.login);
    router.post('/forgot-password', authController.forgotPassword); // Nueva ruta para olvidar la contraseña
    router.post('/reset-password', authController.resetPassword); // Nueva ruta para restablecer la contraseña
    router.post('/validate-res et-token', authController.validateResetToken);


    module.exports = router;
