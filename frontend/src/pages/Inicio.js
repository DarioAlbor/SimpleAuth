import React from 'react';
import SidebarWithHeader from '../components/templates/sidebar';
import About from '../components/templates/about';

const Inicio = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SidebarWithHeader />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-1000px' }}>
        <About />
      </div>
    </div>
  );
};

export default Inicio;
