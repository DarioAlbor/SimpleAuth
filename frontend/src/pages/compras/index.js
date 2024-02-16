import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from './components/sidebarcompras.js';


const ComprasInicio = () => {
  return (
    <ChakraProvider>
    <Sidebar />
    </ChakraProvider>
  );
};

export default ComprasInicio