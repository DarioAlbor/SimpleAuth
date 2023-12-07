import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import styled from 'styled-components';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: ${({ isChatOpen }) => (isChatOpen ? '5px' : '0')};
  right: 5px;
  z-index: 0;
  transition: bottom 0.9s ease;
  overflow: hidden; /* Oculta la barra de desplazamiento */
`;

const ChatContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 16px;
  scrollbar-width: thin; /* Ancho del scrollbar en navegadores compatibles con Firefox */
  scrollbar-color: #3498db transparent; /* Color del scrollbar en navegadores compatibles con Firefox */
  &::-webkit-scrollbar {
    width: 6px; /* Ancho del scrollbar en navegadores compatibles con WebKit (Chrome, Safari, Edge) */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3498db; /* Color del scrollbar en navegadores compatibles con WebKit */
  }
`;

const CircleButton = styled.div`
  border-radius: 50%;
  background-color: #3498db;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  bottom: 10px;
  right: ${({ isChatOpen }) => (isChatOpen ? '0px' : '0')};
  z-index: 1;
  transition: bottom 0.3s ease, right 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    const steps = [
        { id: '1', message: '¡Hola! ¿En qué puedo ayudarte?', trigger: '2' },
        { id: '2', user: true, trigger: '3' },
        { id: '3', message: 'Estoy procesando tu solicitud...', trigger: '2' },
    ];

    // Configuración del chatbot, incluyendo la propiedad headerTitle y placeholder
    const chatbotConfig = {
        width: '400px',
        height: '500px',
        botAvatar: 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f438.svg', // Reemplaza con la ruta de tu imagen de bot
        headerTitle: 'Asistente virtual', // Cambia el título de la ventana del chat
        placeholder: '¿Algún problema? ¡Yo te lo soluciono!', // Cambia el texto del placeholder
    };

    return (
        <ChatbotContainer isChatOpen={isChatOpen}>
            {isChatOpen && (
                <ChatContainer>
                    <ChatBot steps={steps} {...chatbotConfig} />
                </ChatContainer>
            )}
            <CircleButton onClick={toggleChat}>
                <span role="img" aria-label="Chat Icon">
                    💬
                </span>
            </CircleButton>
        </ChatbotContainer>
    );
};

export default Chatbot;
