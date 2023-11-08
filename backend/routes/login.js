const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.login); // Usa la nueva función de inicio de sesión

module.exports = router;
