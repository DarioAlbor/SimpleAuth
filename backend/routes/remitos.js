// routes/remiRoutes.js

const express = require('express');
const router = express.Router();
const RemitoController = require('../controllers/remitoController');

// Ruta para crear un nuevo remito
router.post('/addrto', RemitoController.createRemito);

// Obtener un resumen de todos los remitos
router.get('/resumen', RemitoController.getResumen);

// Edicion del remito
router.put('/editar/:id', RemitoController.editarRemito);

// Eliminar un remito por ID
router.delete('/eliminar/:id', RemitoController.deleteRemito);

// Eliminar todos los remitos con el mismo número de remito
router.delete('/eliminar/nroRemito/:nroRemito', RemitoController.deleteAllRemitosByNroRemito);

module.exports = router;
