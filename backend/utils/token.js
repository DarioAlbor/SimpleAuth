// utils/token.js
const jwt = require('jsonwebtoken');

const secret = 'tu_secreto_aleatorio_y_seguro'; // Cambia esto a una cadena segura y aleatoria

const generateToken = (email) => {
  const token = jwt.sign({ email }, secret, { expiresIn: '30m' });
  return token;
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return true;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return false;
  }
};

module.exports = { generateToken, validateToken };