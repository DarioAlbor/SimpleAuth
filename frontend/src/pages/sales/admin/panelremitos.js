import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBarSales from '../../../pages/sales/components/sidebarsales';
import Pendientes from '../../../pages/sales/remitos/admin/panelpendientes';

const PanelRemitos = () => {
  return (
    <ChakraProvider>
      <SideBarSales />
      <Pendientes />
    </ChakraProvider>
  );
};

export default PanelRemitos;
