// CustomRouter.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPass from './pages/Forgotpass';
import ResetPass from './pages/ResetPass';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import ViaSalud from './pages/ViaSalud';
import NotFound from './pages/404';
import DesignPage from './pages/design';
import SalesPage from './pages/sales';
import SalesChat from './pages/sales/chat';
import UserConfig from './pages/user/Config';
import Chatbot from './components/Chatbot';

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
//DISEÑADORES
    const DesignerRoute = ({ element }) => {
        const allowedRoles = ['Diseñador', 'Developer'];

        // Verificacion
        const isAllowed = userRole && allowedRoles.includes(userRole);

        return isAllowed ? element : <Navigate to="/404" />;
    };
//VENDORES
    const SalesRoute = ({ element }) => {
        const allowedRoles = ['Vendedor', 'Developer'];

        // Verificacion
        const isAllowed = userRole && allowedRoles.includes(userRole);

        return isAllowed ? element : <Navigate to="/404" />;
    };

    return (
        <Routes>
            {/* PUBLICAS ACA */}
            <Route path="/register" element={<PublicRoute element={<Register />} />} />
            <Route path="/login" element={<PublicRoute element={<Login />} />} />
            <Route path="/login/forgotpass" element={<PublicRoute element={<ForgotPass />} />} />
            <Route path="/login/resetpass/:token" element={<PublicRoute element={<ResetPass />} />} />
            {/* PRIVADAS ACA */}
            <Route path="/inicio/*" element={<PrivateRoute><Inicio /></PrivateRoute>} />
            <Route path="/tienda" element={<PrivateRoute><Tienda /></PrivateRoute>} />
            <Route path="/viasalud" element={<PrivateRoute><ViaSalud /></PrivateRoute>} />
            <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
            <Route path="/user" element={<PrivateRoute><UserConfig /></PrivateRoute>} />
            {/* PANEL DE DISEÑO */}
            <Route path="/design/*" element={<PrivateRoute><DesignerRoute element={<DesignPage />} /></PrivateRoute>} />
            {/* PANEL DE VENTAS */}
            <Route path="/sales" element={<PrivateRoute><SalesRoute element={<SalesPage />} /></PrivateRoute>} />
            <Route path="/sales/chat" element={<PrivateRoute><SalesRoute element={<SalesChat />} /></PrivateRoute>} />

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
