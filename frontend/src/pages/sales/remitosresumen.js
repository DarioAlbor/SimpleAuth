// remitosresumen.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBarSales from './components/sidebarsales';
import Resumen from './remitos/resumen';

const ResumenRemitos = () => {
  return (
    <ChakraProvider>
      <SideBarSales />
      <Resumen />
    </ChakraProvider>
  );
};

export default ResumenRemitos;
