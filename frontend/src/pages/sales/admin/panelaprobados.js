import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBarSales from '../../../pages/sales/components/sidebarsales';
import Aprobados from '../../../pages/sales/remitos/admin/panelaprobado';

const PanelAprobados = () => {
  return (
    <ChakraProvider>
      <SideBarSales />
      <Aprobados />
    </ChakraProvider>
  );
};

export default PanelAprobados;
