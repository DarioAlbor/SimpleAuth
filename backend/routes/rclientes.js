const express = require('express');
const router = express.Router();
const RClienteController = require('../controllers/rclienteController');

// Ruta para guardar un nuevo cliente
router.post('/guardar', RClienteController.guardarCliente);

// Ruta para obtener todos los clientes
router.get('/traer', RClienteController.traerCliente);

// Ruta para editar un cliente existente
router.put('/editar/:id', RClienteController.editarCliente);

// Ruta para eliminar un cliente
router.delete('/eliminar/:id', RClienteController.eliminarCliente);

module.exports = router;
