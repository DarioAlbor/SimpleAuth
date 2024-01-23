import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBarFinance from './components/sidebarfinance';
import Panel from './remitos/panelremitospendientes';

const FinanceRemitosPendientes = () => {
  return (
    <ChakraProvider>
      <SideBarFinance />
      <Panel />
    </ChakraProvider>
  );
};

export default FinanceRemitosPendientes;
