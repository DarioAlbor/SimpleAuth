    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/db');

    const Message = sequelize.define('messages', {
      idusuario: {
        type: DataTypes.INTEGER,
        unique: false, // Cambiado a false para permitir duplicados
        allowNull: false,
      },
      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false, // Cambiado a false para permitir duplicados
      },
      contenido: {
        type: DataTypes.TEXT, 
        allowNull: false,
        unique: false, // Cambiado a false para permitir duplicados
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },  
    });

    module.exports = Message;
