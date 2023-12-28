// routes/remiRoutes.js

const express = require('express');
const router = express.Router();
const RemitoController = require('../controllers/remitoController');

// Ruta para crear un nuevo remito
router.post('/addrto', RemitoController.createRemito);

module.exports = router;
