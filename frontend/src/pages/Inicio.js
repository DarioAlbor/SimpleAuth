import React from 'react';
import SidebarWithHeader from '../components/templates/sidebar';
import About from '../components/about';
import Carrousel from '../components/carousel';

const Inicio = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <SidebarWithHeader />
            <Carrousel />
            <div className="about-container">
                <About />
            </div>
        </div>
    );
};

export default Inicio;
