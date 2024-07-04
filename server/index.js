require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

// Crear la aplicación Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.set('strictQuery', true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

// Usar rutas
app.use('/api', userRoutes);

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('Conóceme en https://github.com/DarioAlbor');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});