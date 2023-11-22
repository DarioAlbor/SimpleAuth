import React from 'react';
import SidebarWithHeader from '../components/templates/sidebar';

const Tienda = () => {
    return (
        <div>
            <SidebarWithHeader />
            {/* Las solicitudes dentro de acá se procesarán en el servidor de la Tienda */}
            <div style={{ marginTop: '-560px' }}></div>
            <iframe
                src="http://192.168.0.8"
                title="Tienda"
                width="100%"
                height="500px"
                frameBorder="0"
            ></iframe>
        </div>
    );
};

export default Tienda;
