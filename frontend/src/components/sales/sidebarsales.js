// SideBarSales.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, VStack, Box, Text, Icon, Divider, Button } from '@chakra-ui/react';
import { FiHome, FiUser, FiArrowLeft, FiFileText, FiLifeBuoy, FiSettings } from 'react-icons/fi';
import './css/SideBarSales.css'; // Importar el archivo CSS

const SideBarSales = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      className={`sidebar ${isHovered ? 'expanded' : 'collapsed'}`}
      direction="column"
      align="center"
      justify={isHovered ? 'flex-end' : 'center'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenido de la barra lateral */}
      <VStack spacing="4" align="center">
        <Link to="/sales">
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
            transition="background 0.3s ease"
            p="2"
          >
            <Icon as={FiHome} fontSize="20px" />
            <Text className="sidebar-text" ml={isHovered ? '2' : '-100px'}>
              Inicio
            </Text>
          </Flex>
        </Link>

        <Link to="/sales/chat">
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
            transition="background 0.3s ease"
            p="2"
          >
            <Icon as={FiUser} fontSize="20px" />
            <Text className="sidebar-text" ml={isHovered ? '2' : '-100px'}>
              Chat
            </Text>
          </Flex>
        </Link>

        <Link to="/sales/remitos">
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
            transition="background 0.3s ease"
            p="2"
          >
            <Icon as={FiFileText} fontSize="20px" />
            <Text className="sidebar-text" ml={isHovered ? '2' : '-100px'}>
              Remitos
            </Text>
          </Flex>
        </Link>
      </VStack>

      {/* Botones inferiores */}
      <Box mt="auto">
        <Link to="/">
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
            transition="background 0.3s ease"
            p="2"
          >
            <Icon as={FiArrowLeft} fontSize="20px" />
            <Text className="sidebar-text" ml={isHovered ? '2' : '-100px'}>
              Volver a Garzón
            </Text>
          </Flex>
        </Link>
      </Box>
      <Divider my="2" borderColor="gray.300" />

      {/* Botones de contacto y configuración */}
      <Button
        as="a"
        href="mailto:soporte@drogueriagarzon.com"
        target="_blank"
        rel="noopener noreferrer"
        leftIcon={<Icon as={FiLifeBuoy} />}
        colorScheme="teal"
        variant="solid"
        mb="2"
        _hover={{
          bg: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {!isHovered && <Text className="sidebar-text">Necesito Ayuda</Text>}
      </Button>
      <Link to="/user">
        <Button
          leftIcon={<Icon as={FiSettings} />}
          colorScheme="teal"
          variant="solid"
          mb="2"
          _hover={{
            bg: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {!isHovered && <Text className="sidebar-text">Configuración</Text>}
        </Button>
      </Link>

      {/* Línea blanca al final del lado derecho de la barra */}
      <Box
        position="absolute"
        bottom="0"
        right="0"
        width="1px"
        height="100%"
        bg="white"
        opacity="0.3"
      />

      {/* Línea blanca al final de la barra lateral */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        height="1px"
        bg="white"
        opacity="0.3"
      />
    </Flex>
  );
};

export default SideBarSales