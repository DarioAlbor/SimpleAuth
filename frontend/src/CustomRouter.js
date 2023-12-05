// CustomRouter.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import ViaSalud from './pages/ViaSalud';
import NotFound from './pages/404';
import DesignPage from './pages/design';

const CustomRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
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
                console.error('Error al verificar la autenticación:', error);
                setIsAuthenticated(false);
            }
        };

        const fetchUserRole = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/user/getRole', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                setUserRole(data.role);
            } catch (error) {
                console.error('Error al obtener el rol del usuario:', error);
            } finally {
                setCheckComplete(true);
            }
        };

        checkAuthentication();
        fetchUserRole();
    }, []);

    if (!checkComplete) {
        return null; // o podrías mostrar un indicador de carga aquí
    }

    const PublicRoute = ({ element }) => {
        return isAuthenticated ? <Navigate to="/Inicio" /> : element;
    };

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    const DesignerRoute = ({ element }) => {
        return userRole === 'Diseñador' ? element : <Navigate to="/404" />;
    };

    return (
        <Routes>
            <Route path="/register" element={<PublicRoute element={<Register />} />} />
            <Route path="/login" element={<PublicRoute element={<Login />} />} />

            <Route path="/inicio/*" element={<PrivateRoute><Inicio /></PrivateRoute>} />
            <Route path="/tienda" element={<PrivateRoute><Tienda /></PrivateRoute>} />
            <Route path="/viasalud" element={<PrivateRoute><ViaSalud /></PrivateRoute>} />

            {/* Nueva ruta para la página de diseño */}
            <Route path="/design/*" element={<PrivateRoute><DesignerRoute element={<DesignPage />} /></PrivateRoute>} />

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
