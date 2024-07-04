import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import apiRoutes from './utils/apiroutes';
import { getAuthHeaders } from './utils/auth';
import Index from './pages/index';
import Login from './pages/login';
import Register from './pages/register';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${apiRoutes.baseurl}${apiRoutes.userInfo}`, getAuthHeaders());
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<ProtectedRoute element={Index} />} />
  </Routes>
);

export default AppRoutes;