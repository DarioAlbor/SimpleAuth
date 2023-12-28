// routes/rclientes.js

const express = require('express');
const router = express.Router();
const RClienteController = require('../controllers/rclienteController');

// Ruta para guardar un nuevo cliente
router.post('/guardar', RClienteController.guardarCliente);

// Ruta para obtener todos los clientes
router.get('/traer', RClienteController.traerCliente);

module.exports = router;
