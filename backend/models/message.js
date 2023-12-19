// /models/message.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Message = sequelize.define('messages', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING, // Puedes ajustar el tipo de datos según tu esquema
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

module.exports = Message;
