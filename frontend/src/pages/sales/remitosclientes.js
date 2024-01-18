// remitos.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBarSales from './components/sidebarsales';
import Clientes from './remitos/clientes';

const RemitosClientes = () => {
  return (
    <ChakraProvider>
      <SideBarSales />
      <Clientes />
    </ChakraProvider>
  );
};

export default RemitosClientes;
