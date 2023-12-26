const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./config/db');
const app = express();
const server = http.createServer(app);

// Configuración de express-session
app.use(session({
    secret: 'una_clave_muy_segura_y_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Configura esta opción según tus necesidades
    credentials: true, // Asegúrate de incluir esto
}));

//EXPRESS
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//JS
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Permitir solicitudes desde el frontend

const loginRoutes = require('./routes/login');
const rolesRoutes = require('./routes/roles');
const registerRoutes = require('./routes/register');
const checkEmailRoutes = require('./routes/checkEmail');
const userRoutes = require('./routes/user');
const logoutRoutes = require('./routes/logout');
const checkAuthenticationRoutes = require('./routes/checkAuthentication');
const uploadPdfRoutes = require('./routes/uploadpdf');
const getcarousel = require('./routes/getcarousel');
const uploadbannerRoutes = require('./routes/uploadbanner');
const messagesRoutes = require('./routes/message');

//////////////////////////////////////////////

// Movemos las rutas de mensajes fuera del espacio de /api/messages
app.use('/api/register', registerRoutes);
app.use('/api/checkEmail', checkEmailRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/logout', logoutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user/checkAuthentication', checkAuthenticationRoutes);
app.use('/api/uploadpdf', uploadPdfRoutes);
app.use('/api/getcarousel', getcarousel);
app.use('/api/uploadbanner', uploadbannerRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/messages', messagesRoutes);

//EXPRESS
app.use('/upload/pdf', express.static('assets/recources')); // REVISTA VIA SALUD
app.use('/upload/carousel', express.static('assets/carousel')); // IMAGENES DEL CAROUSEL

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
});

// Configurar Socket.io
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  });

  // Nueva parte para emitir mensajes en tiempo real
  socket.on('newMessage', () => {
    io.emit('newMessage', 'Nuevo mensaje recibido');
  });
});
