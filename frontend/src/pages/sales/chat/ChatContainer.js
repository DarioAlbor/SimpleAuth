import React, { useState } from 'react';
import './css/ChatContainer.css';
import ChatInput from './ChatInput';
import Contacts from './Contacts';

const ChatContainer = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className={`chat-container ${isSidebarExpanded ? 'expanded' : ''}`}>
      <div className="chat-content">
        <div className="chat-header">
          <div className="contact-info">
            <img
              src="url_de_la_imagen_del_contacto"
              alt="Contact Image"
              className="contact-image"
            />
            <div className="contact-details">
              <h2>Contact Name</h2>
              <p>Last seen: 5 minutes ago</p>
            </div>
          </div>
          {/* Puedes agregar más elementos según tus necesidades, como un botón para opciones */}
        </div>
        <div className="chat-messages">
          {/* Aquí se mostrarán los mensajes */}
        </div>
        <ChatInput currentUser="usuario_actual" recipient="destinatario" />
      </div>
      <Contacts />
    </div>
  );
};

export default ChatContainer;
