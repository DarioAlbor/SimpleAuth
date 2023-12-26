// APIRoutes.js
import axios from 'axios';

const baseURL = 'http://localhost:3001'; // Rutas relativas en lugar de URL completa

const APIRoutes = {
  checkAuthentication: () => axios.get(`${baseURL}/checkAuthentication`),
  checkEmail: (email) => axios.get(`${baseURL}/checkemail/${email}`),
  getCarousel: () => axios.get(`${baseURL}/getcarousel`),
  login: (userData) => axios.post(`${baseURL}/login`, userData),
  forgotPassword: (userData) => axios.post(`${baseURL}/login/forgot-password`, userData),
  resetPassword: (userData) => axios.post(`${baseURL}/login/reset-password`, userData),
  validateResetToken: (userData) => axios.post(`${baseURL}/login/validate-reset-token`, userData),
  logout: () => axios.post(`${baseURL}/logout`),
  addMessage: (messageData) => axios.post(`${baseURL}/message/addmsg`, messageData),
  getMessages: () => axios.get(`${baseURL}/message/getmsg`), // Actualizado
  register: (userData) => axios.post(`${baseURL}/register`, userData),
  getSellers: () => axios.get(`${baseURL}/roles/getSellers`),
  uploadBanner: (bannerData) => axios.post(`${baseURL}/uploadbanner`, bannerData),
  uploadPDF: (pdfData) => axios.post(`${baseURL}/uploadpdf`, pdfData),
  getUserInfo: () => axios.get(`${baseURL}/user/getUserInfo`),
  getUsername: () => axios.get(`${baseURL}/user/getUsername`),
  getRole: () => axios.get(`${baseURL}/user/getRole`),
  isUserActive: () => axios.get(`${baseURL}/user/isUserActive`),
};

export default APIRoutes;
