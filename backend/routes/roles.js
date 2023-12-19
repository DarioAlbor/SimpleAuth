// routes/roles.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/rolesController');

// Nueva ruta para obtener la lista de vendedores y su estado isActive
router.get('/getSellers', userController.getSellers);

module.exports = router;
