import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from '../../../pages/compras/components/sidebarcompras';
import Pendientes from '../../../pages/sales/remitos/admin/panelpendientes';

const RemitosPendientes = () => {
  return (
    <ChakraProvider>
      <Sidebar />
      <Pendientes />
    </ChakraProvider>
  );
};

export default RemitosPendientes;
