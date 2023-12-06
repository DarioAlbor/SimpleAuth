const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
    },
  role: {
      type: DataTypes.ENUM('Cliente', 'Diseñador', 'Developer', 'Director'), // RANGOS ACTUALES
      allowNull: false,
      defaultValue: 'Cliente' // Setea automaticamente el rango a Cliente, por ahora solo se cambia manualmente en MYSQL
    },
});

module.exports = User;
