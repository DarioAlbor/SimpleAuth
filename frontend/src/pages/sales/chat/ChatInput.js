import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const ChatInput = ({ currentUser, onMessageSent, onHistoryMessages }) => {
  const [message, setMessage] = useState('');
  const socket = io('http://45.162.169.217:3001', {
    transports: ['websocket'],  // Intenta usar solo WebSocket para una mejor eficiencia
  });

  // Cargar mensajes solo una vez al inicio
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await axios.get('http://45.162.169.217:3001/api/messages/getmsg');

        const historyMessages = response.data.map((msg) => ({
          usuario: msg.usuario,
          contenido: msg.contenido,
          id: msg.id,
        }));

        onHistoryMessages(historyMessages);
      } catch (error) {
        console.error('Error al cargar mensajes:', error.message);
      }
    };

    // Cargar mensajes al montar el componente
    loadMessages();

    socket.on('newMessage', (newMessage) => {
      // Cuando hay un nuevo mensaje, cargar los mensajes nuevamente
      loadMessages();

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
      // socket.disconnect();  // No necesitas desconectar el socket aquí
    };
  }, [onHistoryMessages, onMessageSent, socket]);

  const sendMessage = async () => {
    try {
      const userInfoResponse = await axios.get('http://45.162.169.217:3001/api/user/getUserinfo', { withCredentials: true });
      const user = userInfoResponse.data.user;

      if (!user) {
        console.error('Error: Usuario no definido.');
        return;
      }

      const { id, firstName } = user;
      const timestamp = new Date();

      if (!id || !firstName) {
        console.error('Error: ID o firstName no definidos.');
        return;
      }

      await axios.post('http://45.162.169.217:3001/api/messages/addmsg', {
        idusuario: id,
        usuario: firstName,
        contenido: message,
        timestamp: timestamp,
      });

      const newMessage = {
        usuario: firstName,
        contenido: message,
        id: timestamp.getTime(),
      };

      onMessageSent((prevMessages) => [...prevMessages, newMessage]);

      setMessage('');
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
