const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const sequelize = require('./config/db');
const app = express();

// Configuración de express-session
app.use(session({
    secret: 'una_clave_muy_segura_y_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Configura esta opción según tus necesidades
    credentials: true, // Asegúrate de incluir esto
}));


app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Permitir solicitudes desde el frontend

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const checkEmailRoutes = require('./routes/checkEmail');
const userRoutes = require('./routes/user');
const logoutRoutes = require('./routes/logout');
const checkAuthenticationRoutes = require('./routes/checkAuthentication'); // 

app.use('/api/register', registerRoutes);
app.use('/api/checkEmail', checkEmailRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/logout', logoutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user/checkAuthentication', checkAuthenticationRoutes); //

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
});
