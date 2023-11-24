// CustomRouter.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import NotFound from './pages/404';

const CustomRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkComplete, setCheckComplete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/user/checkAuthentication', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                setIsAuthenticated(data.authenticated);
            } catch (error) {
                console.error('Error al verificar la autenticaci�n:', error);
                setIsAuthenticated(false);
            } finally {
                setCheckComplete(true);
            }
        };

        checkAuthentication();
    }, []);

    if (!checkComplete) {
        return null;
    }

    const PublicRoute = ({ element }) => {
        return isAuthenticated ? <Navigate to="/Inicio" /> : element;
    };

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    return (
        <Routes>
            <Route path="/register" element={<PublicRoute element={<Register />} />} />
            <Route path="/login" element={<PublicRoute element={<Login />} />} />

            <Route path="/Inicio/*" element={<PrivateRoute><Inicio /></PrivateRoute>} />
            <Route path="/tienda" element={<PrivateRoute><Tienda /></PrivateRoute>} />

            <Route
                index
                element={
                    isAuthenticated ? <Navigate to="/Inicio" /> : <Navigate to="/login" />
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default CustomRouter;
