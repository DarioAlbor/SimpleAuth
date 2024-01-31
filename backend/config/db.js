// db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dgweb', 'root', '', {
  host: 'portal.drogueriagarzon.com',
  dialect: 'mysql', // Cambiar si se utiliza un dialecto diferente
});

module.exports = sequelize;
