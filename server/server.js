// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const registerRoutes = require('./routes/register');
app.use('/api/register', registerRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
});
