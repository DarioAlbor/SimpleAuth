// models/remitosClientes.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RemitosClientes = sequelize.define('RemitosClientes', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  razonSocial: {
    type: DataTypes.STRING,
  },
  numeroCuenta: {
    type: DataTypes.STRING,
  },
  direccionEntrega: {
    type: DataTypes.STRING,
  },
});

module.exports = RemitosClientes;
