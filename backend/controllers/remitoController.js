const Remito = require('../models/remito');

exports.createRemito = async (req, res) => {
  try {
    const { remitos, cliente, vendedor } = req.body;

    // Verificar que las propiedades necesarias estén presentes en req.body
    if (!remitos || !cliente || !vendedor) {
      return res.status(400).json({ error: 'Faltan propiedades en la solicitud' });
    }

    // Generar un solo número de remito para todos los conjuntos de datos de remito
    const remitoNumber = await generateRemitoNumber();

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
        nroRemito: remitoNumber,
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
  try {
    // Obtener el último remito de la base de datos ordenando por id de manera descendente
    const lastRemito = await Remito.findOne({ order: [['id', 'DESC']] });

    console.log('lastRemito:', lastRemito);

    // Si no hay remitos en la base de datos, comenzar desde 1
    const lastRemitoNumber = lastRemito
      ? parseInt(lastRemito.nroRemito.split('-')[1], 10) + 1
      : 1;

    // Generar el próximo número de remito
    const currentYear = new Date().getFullYear();
    const nextRemitoNumber = lastRemitoNumber.toString().padStart(6, '0');

    const remitoNumber = `${currentYear}-${nextRemitoNumber}`;

    return remitoNumber;
  } catch (error) {
    console.error('Error al generar el número de remito:', error);
    throw error;
  }
};

exports.getResumen = async (req, res) => {
  try {
    // Consultar la base de datos para obtener el resumen de remitos
    const remitos = await Remito.findAll({
      attributes: ['id', 'unidades', 'item', 'precio', 'total', 'cliente', 'vendedor', 'oferta', 'iva', 'nroRemito', 'estado'],
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
      oferta: remito.oferta,
      iva: remito.iva,
      precio: remito.precio,
      estado: remito.estado,
    }));

    res.status(200).json(resumenRemitos);
  } catch (error) {
    console.error('Error al obtener el resumen de remitos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.editarRemito = async (req, res) => {
  try {
    const { id } = req.params;
    const { unidades, item, precio, iva, oferta, total, estado } = req.body;

    // Buscar el remito por su ID
    const remitoExistente = await Remito.findByPk(id);

    if (!remitoExistente) {
      return res.status(404).json({ error: 'Remito no encontrado.' });
    }

    // Actualizar las columnas deseadas
    await remitoExistente.update({
      unidades,
      item,
      precio,
      iva,
      oferta,
      total,
      estado,
    });

    res.status(200).json({ mensaje: 'Remito editado correctamente.' });
  } catch (error) {
    console.error('Error al editar el remito:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

exports.deleteRemito = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el remito por su ID
    const remitoExistente = await Remito.findByPk(id);

    if (!remitoExistente) {
      return res.status(404).json({ error: 'Remito no encontrado.' });
    }

    // Eliminar el remito por ID
    await remitoExistente.destroy();

    res.status(200).json({ mensaje: 'Remito eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el remito:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

exports.deleteAllRemitosByNroRemito = async (req, res) => {
  try {
    const { nroRemito } = req.params;

    // Eliminar todos los remitos con el mismo nroRemito
    await Remito.destroy({ where: { nroRemito } });

    res.status(200).json({ mensaje: 'Todos los remitos con el mismo número han sido eliminados.' });
  } catch (error) {
    console.error('Error al eliminar todos los remitos por número de remito:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

exports.getDetalleRemito = async (req, res) => {
  try {
    const { nroRemito } = req.params;
    
    // Cambiar la búsqueda para encontrar todos los remitos con el mismo nroRemito
    const remitos = await Remito.findAll({ where: { nroRemito } });

    if (!remitos || remitos.length === 0) {
      return res.status(404).json({ error: 'Remitos no encontrados.' });
    }

    // Mapear los remitos al formato deseado para el detalle
    const detallesRemitos = remitos.map(remito => ({
      id: remito.id,
      unidades: remito.unidades,
      item: remito.item,
      total: remito.total,
      cliente: remito.cliente,
      vendedor: remito.vendedor,
      nroRemito: remito.nroRemito,
      oferta: remito.oferta,
      iva: remito.iva,
      precio: remito.precio,
      estado: remito.estado,
    }));

    res.status(200).json(detallesRemitos);
  } catch (error) {
    console.error('Error al obtener el detalle del remito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
