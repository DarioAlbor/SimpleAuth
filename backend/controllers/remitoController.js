const Remito = require('../models/Remito');

// creación de un nuevo remito
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

    // étodo create para insertar un remito por cada conjunto de datos
    for (let i = 0; i < unidades.length; i++) {
      await Remito.create({
        unidades: unidades[i],
        item: item[i],
        precio: precio[i],
        oferta: oferta[i],
        total: total[i],
        iva: iva[i],
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


exports.getResumen = async (req, res) => {
    try {
      // Consultar la base de datos para obtener el resumen de remitos
      const remitos = await Remito.findAll({
        attributes: ['id', 'unidades', 'item', 'total', 'cliente', 'vendedor'],
      });
  
      // Mapear los resultados para construir el resumen final
      const resumenRemitos = remitos.map((remito) => ({
        id: remito.id,
        unidades: remito.unidades,
        item: remito.item,
        total: remito.total,
        cliente: remito.cliente,
        vendedor: remito.vendedor,
      }));
  
      res.status(200).json(resumenRemitos);
    } catch (error) {
      console.error('Error al obtener el resumen de remitos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };