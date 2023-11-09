const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const sequelize = require('./config/db');
const app = express();

// Configuración de express-session
app.use(session({
  secret: 'una_clave_muy_segura_y_secreta',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const checkEmailRoutes = require('./routes/checkEmail');
const userRoutes = require('./routes/user');

app.use('/api/register', registerRoutes);
app.use('/api/checkEmail', checkEmailRoutes);
app.use('/api/login', loginRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
});
