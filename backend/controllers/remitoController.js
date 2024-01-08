const Remito = require('../models/remito');

// Variable para almacenar el número autoincremental de remitos
let currentRemitoCounter = 0;

exports.createRemito = async (req, res) => {
  try {
    const { remitos, cliente, vendedor } = req.body;

    // Verificar que las propiedades necesarias estén presentes en req.body
    if (!remitos || !cliente || !vendedor) {
      return res.status(400).json({ error: 'Faltan propiedades en la solicitud' });
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
        nroRemito: await generateRemitoNumber(),
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

    res.status(201).json({ mensaje: 'Remito(s) creado(s) exitosamente' });
  } catch (error) {
    console.error('Error al crear el remito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para generar un número de remito en el formato deseado (año-número)
const generateRemitoNumber = async () => {
  const currentYear = new Date().getFullYear();
  const formattedCounter = currentRemitoCounter.toString().padStart(6, '0');
  const remitoNumber = `${currentYear}-${formattedCounter}`;
  currentRemitoCounter += 1;
  return remitoNumber;
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
