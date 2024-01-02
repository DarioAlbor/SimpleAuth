const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./config/db');
const Message = require('./models/Message'); // Importa el modelo Message
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

// Express Middleware
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://45.162.169.217:3000', credentials: true }));

// Rutas
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
const RemitosClientes = require('./routes/rclientes');
const Remitos = require('./routes/remitos');

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
app.use('/api/remitos/clientes', RemitosClientes);
app.use('/api/remitos', Remitos);

// Express Static Routes
app.use('/upload/pdf', express.static('assets/recources'));
app.use('/upload/carousel', express.static('assets/carousel'));

// Configurar Socket.io
const io = socketIo(server, {
  cors: {
    origin: 'http://45.162.169.217:3000',
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
  global.chatSocket = socket;

  // Manejar eventos de Socket.io
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', async (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);

      // Guardar el mensaje en la base de datos
      try {
        const { idusuario, usuario, contenido, timestamp } = data.msg;
        await Message.create({ idusuario, usuario, contenido, timestamp });
      } catch (error) {
        console.error('Error al guardar el mensaje en la base de datos:', error.message);
      }
    }
  });

  // Emitir mensajes en tiempo real
  socket.on('newMessage', () => {
    io.emit('newMessage', 'Nuevo mensaje recibido');
  });

  // Desconexión del usuario
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
});
