// db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dgweb', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql', // Cambiar si se utiliza un dialecto diferente
});

module.exports = sequelize;
