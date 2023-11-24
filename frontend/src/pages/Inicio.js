import React from 'react';
import SidebarWithHeader from '../components/templates/sidebar';
import About from '../components/templates/about';

const Inicio = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <SidebarWithHeader />
            <div className="about-container">
                <About />
            </div>
        </div>
    );
};

export default Inicio;
