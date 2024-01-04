import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const ChatInput = ({ onMessageSent, onHistoryMessages }) => {
  const [message, setMessage] = useState('');
  const [lastLoadTime, setLastLoadTime] = useState(null);
  const socket = io('http://localhost:3001', {
    transports: ['websocket'],
  });

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const currentTime = new Date();
        // Verificar si ha pasado al menos 15 segundos desde la última carga
        if (!lastLoadTime || currentTime - lastLoadTime > 15000) {
          const response = await axios.get('http://localhost:3001/api/messages/getmsg');

          const historyMessages = response.data.map((msg) => ({
            usuario: msg.usuario,
            contenido: msg.contenido,
            id: msg.id,
          }));

          onHistoryMessages(historyMessages);
          setLastLoadTime(currentTime); // Actualizar el tiempo de la última carga
        }
      } catch (error) {
        console.error('Error al cargar mensajes:', error.message);
      }
    };

    // Cargar mensajes al montar el componente
    loadMessages();

    // Configurar intervalo para cargar mensajes cada 15 segundos
    const intervalId = setInterval(loadMessages, 15000);

    // Escuchar nuevos mensajes desde el socket
    socket.on('newMessage', (newMessage) => {
      onMessageSent((prevMessages) => [
        ...prevMessages,
        {
          usuario: newMessage.usuario,
          contenido: newMessage.contenido,
          id: newMessage.id,
        },
      ]);
    });

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    };
  }, [onHistoryMessages, onMessageSent, socket, lastLoadTime]);

  const sendMessage = async () => {
    try {
      // ... (código para enviar mensajes)
      setLastLoadTime(null); // Forzar la carga de mensajes en el próximo intervalo
    } catch (error) {
      console.error('Error al enviar el mensaje:', error.message);
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje.."
        className="message-input"
      />
      <button onClick={sendMessage} className="send-button">
        Enviar
      </button>
    </div>
  );
};

export default ChatInput;
