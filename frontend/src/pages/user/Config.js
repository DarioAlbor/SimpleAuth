import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Heading,
  Divider,
  Text,
  Button,
  Icon,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import {
  HiUserCircle,
  HiKey,
  HiMail,
  HiUserAdd,
} from 'react-icons/hi';
import SidebarWithHeader from '../../components/templates/sidebar';
import Chatbot from '../../components/Chatbot';
import ColorModeToggle from './buttons/colormodetoggle';

const Config = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    id: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/getUserinfo', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        setUserInfo({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          id: data.user.id || '',
        });
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const buttonColorScheme = useColorModeValue('teal', 'teal'); // Ajusta el esquema de colores según el modo de color
  const textColor = useColorModeValue('black', 'white'); // Ajusta el color del texto según el modo de color

  return (
    <>
      <SidebarWithHeader />
      <Chatbot />

      <Flex direction="column" p={8} align="center">

        {/* Título */}
        <Center mb={10}>
          <Box>
            <Heading>Configuración</Heading>
          </Box>
        </Center>

        {/* Icono de Usuario */}
        <Center mb={4}>
          <Box>
            <Icon as={HiUserCircle} boxSize={150} color={buttonColorScheme} />
          </Box>
        </Center>

        {/* Información del Usuario */}
        <Text mb={2} fontSize="3xl" fontWeight="bold" color={textColor}>
          {userInfo.firstName} {userInfo.lastName}
        </Text>
        <Text mb={2} fontSize="md" fontFamily="Arial" color="gray.500">
          ID: {userInfo.id}
        </Text>

        {/* Divider */}
        <Divider my={5} />

        {/* Sección de Botones */}
        <Flex direction="column" align="center">
          <Button
            leftIcon={<Icon as={HiKey} />}
            colorScheme={buttonColorScheme}
            mb={2}
            width="90%" // Ajusta el ancho del botón
          >
            Cambiar Contraseña
          </Button>
          <Button
            leftIcon={<Icon as={HiMail} />}
            colorScheme={buttonColorScheme}
            mb={2}
            width="80%" // Ajusta el ancho del botón
          >
            Cambiar Correo
          </Button>
          <Button
            leftIcon={<Icon as={HiUserAdd} />}
            colorScheme={buttonColorScheme}
            mb={2}
            width="80%" // Ajusta el ancho del botón
          >
            Agregar Usuario
          </Button>
        </Flex>
        <ColorModeToggle />

        {/* Divider */}
        <Divider my={5} />

      </Flex>
    </>
  );
};

export default Config;
