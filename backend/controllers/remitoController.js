// controllers/RemitoController.js

const Remito = require('../models/remito');

// Manejar la creación de un nuevo remito
exports.createRemito = async (req, res) => {
  try {
    const {
      unidades,
      item,
      precio,
      oferta,
      total,
      iva,
      cliente,
      vendedor,
    } = req.body;

    const nuevoRemito = await Remito.create({
      unidades,
      item,
      precio,
      oferta,
      total,
      iva,
      cliente,
      vendedor,
    });

    res.status(201).json({ mensaje: 'Remito creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el remito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
