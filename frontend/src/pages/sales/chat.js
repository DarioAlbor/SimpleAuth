import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import SideBarSales from '../../components/sales/sidebarsales';
import ChatPage from '../../components/sales/chatpage';

const Chat = () => {
  return (
    <ChakraProvider>
      <div style={{ position: 'relative', height: '100vh' }}>
        <SideBarSales style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <ChatPage />
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Chat;
