// models/Remito.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de tener configurada tu instancia de Sequelize

const Remito = sequelize.define('Remito', {
  unidades: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  item: {
    type: DataTypes.STRING(255), // Establece una longitud máxima de 255 caracteres
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  oferta: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  iva: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // Agrega otras propiedades según sea necesario
  // ...
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vendedor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Remito;
