import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBarSales from '../../components/sales/sidebarsales';

const SalesPage = () => {
  return (
    <ChakraProvider>
      <SideBarSales />
    </ChakraProvider>
  );
};

export default SalesPage;
