import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Flex, Input, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import GetSellers from './chat/getsellers';
import SellerList from './chat/sellerlist';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(''); // Nuevo estado para almacenar el ID del usuario
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    addMessage('Sistema', `¡Bienvenido al chat, ${username}!`);
  }, [username]);

  const addMessage = (user, text) => {
    const newMessages = [...messages, { user, text }];
    setMessages(newMessages);
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      // Modificamos la llamada a la API para incluir la ID y el contenido del mensaje
      const response = await axios.post('http://drogueriagarzon.com:3001/api/messages', {
        userId: userId, // Asegúrate de tener el ID del usuario disponible en esta variable
        usuario: username, // Puedes ajustar esto según tu lógica
        contenido: newMessage,
      });

      console.log('Mensaje enviado con éxito:', response.data);

      addMessage(username, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Container mt="0" position="absolute" top="0" left="0" right="0">
      <Flex direction="row" justify="flex-start" align="stretch" h="100vh" ml="-180px" flex="1">
        <Box minW="200px" ml="1px" overflowY="auto" p="1">
          <GetSellers setUsername={setUsername} setUserId={setUserId} />
          <SellerList />
        </Box>
        <Box w="full" position="relative">
          <Flex
            direction="column"
            p="5"
            rounded="lg"
            overflowY="auto"
            bgColor="#EDEDED"
            ref={messagesContainerRef}
            css={{
              height: 'calc(100vh - 70px)', // Altura fija
              overflowY: 'auto',
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                alignSelf={message.user === username ? 'flex-start' : 'flex-end'}
                mb="1"
                maxWidth="100%"
                position="relative"
              >
                <Text fontSize="sm" fontWeight="bold" mb="1" color="#888888">
                  {message.user}
                </Text>
                <Box
                  bg={message.user === username ? '#128C7E' : '#DCF8C6'}
                  p="2"
                  rounded="md"
                  shadow="sm"
                  color={message.user === username ? '#FFFFFF' : '#000000'}
                >
                  <Text fontSize="md">{message.text}</Text>
                </Box>
                <Box
                  position="absolute"
                  left={message.user === username ? 'auto' : '-10px'}
                  right={message.user === username ? '-10px' : 'auto'}
                  top="50%"
                  transform="translateY(-50%)"
                  w="0"
                  h="0"
                  borderStyle="solid"
                  borderWidth="6px"
                  borderColor={`transparent transparent transparent ${
                    message.user === username ? '#128C7E' : '#DCF8C6'
                  }`}
                ></Box>
              </Box>
            ))}
          </Flex>
          <Flex mt="3">
            <Input
              flex="1"
              rounded="full"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
            />
            <Button ml="2" colorScheme="whatsapp" onClick={sendMessage}>
              Enviar
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default ChatPage;
