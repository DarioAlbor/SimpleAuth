// db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dgweb', 'root', '', {
  host: 'drogueriagarzon.com',
  dialect: 'mysql', // Cambiar si se utiliza un dialecto diferente
});

module.exports = sequelize;
