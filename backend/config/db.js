// db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dgweb', 'root', '', {
  host: '45.162.169.217',
  dialect: 'mysql', // Cambiar si se utiliza un dialecto diferente
});

module.exports = sequelize;
