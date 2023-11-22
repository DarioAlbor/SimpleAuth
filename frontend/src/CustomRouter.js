import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import NotFound from './pages/404'; // Asegúrate de tener una página NotFound creada

const CustomRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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

                // Si no está autenticado, redirigimos a /login
                if (!data.authenticated) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error al verificar la autenticación:', error);
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, [navigate]);

    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Rutas privadas */}
            {isAuthenticated && (
                <>
                    <Route path="/Inicio/*" element={<Inicio />} />
                    <Route path="/tienda" element={<Tienda />} />
                </>
            )}

            {/* Redirección de la ruta por defecto */}
            <Route
                index
                element={isAuthenticated ? <Navigate to="/Inicio" /> : <Navigate to="/login" />}
            />

            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default CustomRouter;
