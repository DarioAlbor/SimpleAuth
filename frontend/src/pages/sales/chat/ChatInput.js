import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const ChatInput = ({ currentUser, recipient }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:3001');

  useEffect(() => {
    // Cargar historial de mensajes al montar el componente
    loadMessages();

    // Escuchar el evento de nuevo mensaje
    socket.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Limpiar el socket al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, [currentUser, recipient, socket]);

  const loadMessages = async () => {
    try {
      // Obtener mensajes del backend
      const response = await axios.get('http://localhost:3001/api/messages/getmsg', {
        params: {
          from: currentUser.id,
          to: recipient.id,
        },
      });

      // Actualizar el estado de mensajes
      setMessages(response.data);
    } catch (error) {
      console.error('Error al cargar mensajes:', error.message);
    }
  };

  const sendMessage = async () => {
    try {
      // Obtener la información del usuario actual
      const userInfoResponse = await axios.get('http://localhost:3001/api/user/getUserinfo', { withCredentials: true });
      const user = userInfoResponse.data.user;

      // Asegurarse de que el usuario tenga un valor definido
      if (!user) {
        console.error('Error: Usuario no definido.');
        return;
      }

      // Obtener la id, firstName y la fecha y hora actual
      const { id, firstName } = user;
      const timestamp = new Date();

      // Asegurarse de que id y firstName tengan valores definidos
      if (!id || !firstName) {
        console.error('Error: ID o firstName no definidos.');
        return;
      }

      // Log para verificar los datos antes de enviar la solicitud POST
      console.log('Datos a enviar:', { id, usuario: firstName, contenido: message, timestamp });

      // Enviar el mensaje al backend
      await axios.post('http://localhost:3001/api/messages/addmsg', {
        idusuario: id,
        usuario: firstName,
        contenido: message,
        timestamp: timestamp,
      });

      // Limpiar el campo de mensaje
      setMessage('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error.message);
    }
  };

  return (
    <div className="chat-input">
      {/* Aquí colocaremos el componente de entrada de mensajes */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje.."
        className="message-input"
      />
      <button onClick={sendMessage} className="send-button">
        Enviar
      </button>

      {/* Mostrar los mensajes */}
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.fromSelf ? 'Yo: ' : `${msg.username}: `}
            {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;
