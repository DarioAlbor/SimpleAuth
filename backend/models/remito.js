// models/Remito.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de tener configurada tu instancia de Sequelize

const Remito = sequelize.define('Remito', {
  nroRemito: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unidades: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oferta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iva: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
