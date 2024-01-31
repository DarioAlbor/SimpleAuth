import React, { useState, useEffect, useRef } from 'react';
import './css/ChatContainer.css';
import ChatInput from './ChatInput';
import Contacts from './Contacts';
import axios from 'axios';

const ChatContainer = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [activeUser, setActiveUser] = useState('');
  const chatMessagesRef = useRef(null);

  const handleNewMessage = (newMessage) => {
    setChatMessages(newMessage);
  };

  const handleHistoryMessages = (historyMessages) => {
    setChatMessages(historyMessages);
  };

  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        const response = await axios.get('https://portal.drogueriagarzon.com:3001/api/user/getUsername', { withCredentials: true });
        setActiveUser(response.data.username);
      } catch (error) {
        console.error('Error al obtener el nombre de usuario:', error.message);
      }
    };

    fetchActiveUser();
  }, []);

  useEffect(() => {
    // Scroll automático hacia abajo cuando cambian los mensajes
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-container">
      <div className="chat-content">
        <div ref={chatMessagesRef} className="chat-messages">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.usuario === activeUser ? 'message-self' : 'message-other'}`}
            >
              {`${msg.usuario}: ${msg.contenido}`}
            </div>
          ))}
        </div>
        <ChatInput
          currentUser={{ id: 1, firstName: activeUser }}
          onMessageSent={handleNewMessage}
          onHistoryMessages={handleHistoryMessages}
        />
      </div>
      <Contacts />
    </div>
  );
};

export default ChatContainer;
