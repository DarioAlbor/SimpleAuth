import React from 'react';
import SidebarWithHeader from '../components/templates/sidebar';
import Catalogo from '../components/Catalogo'; // Asegúrate de tener la ruta correcta
import Chatbot from '../components/Chatbot'

const Tienda = () => {
    return (
        <div>
            <SidebarWithHeader />
            <Chatbot />
            <Catalogo />
        </div>
    );
};

export default Tienda;
