const baseurl = 'https://simpleauth-28pv.onrender.com/api';

// RUTAS GET
const routes = {
  traerUsuarios: '/users',
  userInfo: '/userinfo',

  // RUTAS POST
  crearUsuario: '/users',
  userLogin: '/login',
  userLogout: '/logout',

  // RUTAS PUT
  updateUserInfo: '/userinfo'
};

module.exports = {
  baseurl,
  ...routes,
};