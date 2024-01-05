// controllers/rclienteController.js

const RemitosClientes = require('../models/remitosClientes');

// Variable para almacenar la lista de clientes en caché
let cachedClientes = null;

exports.guardarCliente = async (req, res) => {
  try {
    const { nombre, razonSocial, numeroCuenta, direccionEntrega, horario } = req.body;

    const nuevoCliente = await RemitosClientes.create({
      nombre,
      razonSocial,
      numeroCuenta,
      direccionEntrega,
      horario,
    });

    // Limpiar la caché cuando se agrega un nuevo cliente
    cachedClientes = null;

    res.status(201).json({ mensaje: 'Cliente guardado correctamente.' });
  } catch (error) {
    console.error('Error al guardar el cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

exports.traerCliente = async (req, res) => {
  try {
    // Consultar la base de datos solo si la caché está vacía
    if (cachedClientes === null) {
      cachedClientes = await RemitosClientes.findAll({
        attributes: ['id', 'nombre', 'razonSocial', 'numeroCuenta', 'direccionEntrega', 'horario'],
      });
    }

    res.status(200).json(cachedClientes);
  } catch (error) {
    console.error('Error al obtener todos los clientes:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
