import React from 'react';
import SidebarWithHeader from '../components/templates/sidebar';
import Catalogo from '../components/Catalogo'; // Asegúrate de tener la ruta correcta

const Tienda = () => {
    return (
        <div>
            <SidebarWithHeader />
            {/* Agregamos el componente del catálogo */}
            <Catalogo />
        </div>
    );
};

export default Tienda;
