const Remito = require('../models/remito');

let currentRemitoNumber = null;

exports.createRemito = async (req, res) => {
  try {
    const { remitos, cliente, vendedor } = req.body;

    // Verificar que las propiedades necesarias estén presentes en req.body
    if (!remitos || !cliente || !vendedor) {
      return res.status(400).json({ error: 'Faltan propiedades en la solicitud' });
    }

    // Generación automática de nroRemito único para la petición actual
    if (currentRemitoNumber === null) {
      currentRemitoNumber = generateRandomRemitoNumber();
    }

    // Método create para insertar un remito por cada conjunto de datos
    for (let i = 0; i < remitos.length; i++) {
      const {
        unidades,
        item,
        precio,
        oferta,
        total,
        iva,
      } = remitos[i];

      // Verificar que las propiedades necesarias estén presentes en cada conjunto de datos
      if (!unidades || !item || !precio || !oferta || !iva) {
        return res.status(400).json({ error: 'Faltan propiedades en los datos del remito' });
      }

      await Remito.create({
        nroRemito: currentRemitoNumber,
        unidades,
        item,
        precio,
        oferta,
        total,
        iva,
        cliente,
        vendedor,
      });
    }

    // Resetear el número de remito después de completar la petición
    currentRemitoNumber = null;

    res.status(201).json({ mensaje: 'Remito(s) creado(s) exitosamente' });
  } catch (error) {
    console.error('Error al crear el remito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para generar un número de remito aleatorio
const generateRandomRemitoNumber = () => {
  // Lógica para generar un número de remito único (puedes adaptarla según tus necesidades)
  return Math.floor(Math.random() * 1000000) + 1;
};



exports.getResumen = async (req, res) => {
  try {
    // Consultar la base de datos para obtener el resumen de remitos
    const remitos = await Remito.findAll({
      attributes: ['id', 'unidades', 'item', 'total', 'cliente', 'vendedor', 'nroRemito'],
    });

    // Mapear los resultados para construir el resumen final
    const resumenRemitos = remitos.map((remito) => ({
      id: remito.id,
      unidades: remito.unidades,
      item: remito.item,
      total: remito.total,
      cliente: remito.cliente,
      vendedor: remito.vendedor,
      nroRemito: remito.nroRemito,
    }));

    res.status(200).json(resumenRemitos);
  } catch (error) {
    console.error('Error al obtener el resumen de remitos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
