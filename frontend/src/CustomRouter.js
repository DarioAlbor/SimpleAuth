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
import UserConfig from './pages/user/Config';
import Chatbot from './components/Chatbot';

//VENTAS
import SalesPage from './pages/sales';
import SalesChat from './pages/sales/chat';
import SalesRemitos from './pages/sales/remitos';
import SalesRemitosClientes from './pages/sales/remitosclientes';
import ResumenRemitos from './pages/sales/remitosresumen';

//JEFE DE VENTAS
import PanelRemitos from './pages/sales/admin/panelremitos';
import PanelAprobados from './pages/sales/admin/panelaprobados';
import PanelPagados from './pages/sales/admin/panelpagados';

//ADMINISTRACION
import FinanceInicio from './pages/finance/index';
import FinanceRemitosPendientes from './pages/finance/remitospendientes';
import FinanceRemitosPagados from './pages/finance/remitospagados';

const CustomRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [checkComplete, setCheckComplete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('http://portal.drogueriagarzon.com/apiuser/checkAuthentication', {
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
                const response = await fetch('http://portal.drogueriagarzon.com/apiuser/getRole', {
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
        const allowedRoles = ['Designer', 'Developer', 'Director'];

        // Verificacion
        const isAllowed = userRole && allowedRoles.includes(userRole);

        return isAllowed ? element : <Navigate to="/404" />;
    };
//VENDORES
    const SalesRoute = ({ element }) => {
        const allowedRoles = ['Vendedor', 'Developer', 'Director', 'J. Ventas'];

        // Verificacion
        const isAllowed = userRole && allowedRoles.includes(userRole);

        return isAllowed ? element : <Navigate to="/404" />;
    };

    // JEFE DE VENTAS

    const AdminSalesRoute = ({ element }) => {
        const allowedRoles = ['J. Ventas', 'Developer', 'Director'];

        // Verificacion
        const isAllowed = userRole && allowedRoles.includes(userRole);

        return isAllowed ? element : <Navigate to="/404" />;
    };

//DIRECTORES
const FinanceRoute = ({ element }) => {
    const allowedRoles = ['Director', 'Developer', 'Administracion'];

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
            <Route path="/sales/remitos" element={<PrivateRoute><SalesRoute element={<SalesRemitos />} /></PrivateRoute>} />
            <Route path="/sales/remitos/clientes" element={<PrivateRoute><SalesRoute element={<SalesRemitosClientes />} /></PrivateRoute>} />
            <Route path="/sales/remitos/resumen" element={<PrivateRoute><SalesRoute element={<ResumenRemitos />} /></PrivateRoute>} />

            {/* PANEL JEFE DE VENTAS */}
            <Route path="/sales/admin/panel" element={<PrivateRoute><AdminSalesRoute element={<PanelRemitos />} /></PrivateRoute>} />
            <Route path="/sales/admin/aprobados" element={<PrivateRoute><AdminSalesRoute element={<PanelAprobados />} /></PrivateRoute>} />
            <Route path="/sales/admin/pagados" element={<PrivateRoute><AdminSalesRoute element={<PanelPagados />} /></PrivateRoute>} />

            {/* PANEL DE ADMINISTRACION */}
            <Route path="/finance/inicio" element={<PrivateRoute><FinanceInicio element={<FinanceRoute />} /></PrivateRoute>} />
            <Route path="/finance/pendientes" element={<PrivateRoute><FinanceRemitosPendientes element={<FinanceRoute />} /></PrivateRoute>} />
            <Route path="/finance/pagados" element={<PrivateRoute><FinanceRemitosPagados element={<FinanceRoute />} /></PrivateRoute>} />

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
