import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBarFinance from './components/sidebarfinance';
import Panel from './remitos/panelremitospagados';

const FinanceRemitosPagados = () => {
  return (
    <ChakraProvider>
      <SideBarFinance />
      <Panel />
    </ChakraProvider>
  );
};

export default FinanceRemitosPagados;
