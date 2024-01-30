import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBarSales from '../../../pages/sales/components/sidebarsales';
import Pagados from '../../../pages/sales/remitos/admin/panelpagados';

const PanelRemitos = () => {
  return (
    <ChakraProvider>
      <SideBarSales />
      <Pagados />
    </ChakraProvider>
  );
};

export default PanelRemitos;
