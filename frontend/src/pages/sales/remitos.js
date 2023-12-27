// remitos.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBarSales from '../../components/sales/sidebarsales';
import RemitosContainer from './remitos/remitoscontainer';

const Remitos = () => {
  return (
    <ChakraProvider>
      <SideBarSales />
      <RemitosContainer />
    </ChakraProvider>
  );
};

export default Remitos;
