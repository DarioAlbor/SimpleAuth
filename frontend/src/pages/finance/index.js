import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBar from './components/sidebarfinance';

const AdminPage = () => {
  return (
    <ChakraProvider>
      <SideBar />
    </ChakraProvider>
  );
};

export default AdminPage;
