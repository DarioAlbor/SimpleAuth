// Chat.js
import React from 'react';
import ChatContainer from './chat/ChatContainer';
import SidebarSales from '../../components/sales/sidebarsales';

const Chat = () => {
  return (
    <div className="chat-app">
      <div className="chat-content">
        <SidebarSales />
        <ChatContainer />
      </div>
    </div>
  );
}

export default Chat;
