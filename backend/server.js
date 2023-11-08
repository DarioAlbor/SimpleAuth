// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const app = express();

app.use(bodyParser.json());
app.use(cors());


const loginRoutes = require('./routes/login'); // Importa la nueva ruta de inicio de sesión
const registerRoutes = require('./routes/register');
const checkEmailRoutes = require('./routes/checkEmail'); // Importa la ruta para verificar el correo

app.use('/api/register', registerRoutes);
app.use('/api/checkEmail', checkEmailRoutes); // Usa la nueva ruta para verificar el correo
app.use('/api/login', loginRoutes); // Usa la nueva ruta de inicio de sesión


const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
});
