// SideBarSales.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  VStack,
  Box,
  Text,
  Icon,
  Divider,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiHome,
  FiUser,
  FiArrowLeft,
  FiFileText,
  FiLifeBuoy,
  FiSettings,
  FiFile,
  FiList,
  FiUsers,
  FiChevronDown,
  FiMail,
} from 'react-icons/fi';
import './css/SideBarSales.css'; // Importar el archivo CSS

const SideBarSales = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSubMenuExpanded, setIsSubMenuExpanded] = useState(false);

  const textColor = useColorModeValue('white', 'gray.200');

  const handleSubMenuToggle = (e) => {
    e.preventDefault();
    setIsSubMenuExpanded(!isSubMenuExpanded);
  };

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

      <VStack spacing="5" align="center">
        <Link to="/sales">
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
          >
            <Icon as={FiHome} fontSize="20px" />
            <Text className="sidebar-text" ml={isHovered ? '2' : '-100px'} transition="margin-left 0.3s ease" color={textColor}>
              Inicio
            </Text>
          </Flex>
        </Link>

        {/* Enlace "Remitos" con submenú */}
        <Link to="#" className="menu-item" onClick={handleSubMenuToggle}>
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
          >
            <Icon as={FiFileText} fontSize="20px" />
            <Text className="sidebar-text menu-text" ml={isHovered ? '2' : '-100px'} color={textColor}>
              Remitos <Icon as={FiChevronDown} ml="2" />
            </Text>
          </Flex>
        </Link>

        {/* Submenú fijo de "Remitos" */}
        {isSubMenuExpanded && (
          <VStack spacing="5" align="center">
            <Link to="/sales/remitos">
              <Flex
                align="center"
                _hover={{
                  bg: 'rgba(66, 153, 225, 0.8)',
                  borderRadius: 'md',
                }}
              >
                <Icon as={FiFile} fontSize="20px" />
                <Text className="sidebar-text" color={textColor}>
                  Remito
                </Text>
              </Flex>
            </Link>
            <Link to="/sales/remitos/resumen">
              <Flex
                align="center"
                _hover={{
                  bg: 'rgba(66, 153, 225, 0.8)',
                  borderRadius: 'md',
                }}
              >
                <Icon as={FiList} fontSize="20px" />
                <Text className="sidebar-text" color={textColor}>
                  Resumen
                </Text>
              </Flex>
            </Link>
            <Link to="/sales/remitos/clientes">
              <Flex
                align="center"
                _hover={{
                  bg: 'rgba(66, 153, 225, 0.8)',
                  borderRadius: 'md',
                }}
              >
                <Icon as={FiUsers} fontSize="20px" />
                <Text className="sidebar-text" color={textColor}>
                  Clientes
                </Text>
              </Flex>
            </Link>
          </VStack>
        )}
          <VStack spacing="5" align="center">
        <Link to="/sales/chat">
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
          >
            <Icon as={FiUser} fontSize="20px" />
            <Text className="sidebar-text" ml={isHovered ? '2' : '-100px'} transition="margin-left 0.1s ease" color={textColor}>
              Chat
            </Text>
          </Flex>
        </Link>
      </VStack>
      <VStack spacing="5" align="center">
      <a href="https://vefixy.com/webmail2/" target="_blank" rel="noopener noreferrer">
  <Flex
    align="center"
    _hover={{
      bg: 'rgba(66, 153, 225, 0.8)',
      borderRadius: 'md',
    }}
  >
    <Icon as={FiMail} fontSize="20px" />
    <Text className="sidebar-text" ml={isHovered ? '2' : '-200px'} transition="margin-left 0.1s ease" color={textColor}>
      Mail
    </Text>
  </Flex>
</a>
</VStack>      </VStack>
      {/* Botones inferiores */}
      <Box mt="auto">
        <Link to="/">
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
          >
            <Icon as={FiArrowLeft} fontSize="20px" />
            <Text className="sidebar-text" ml={isHovered ? '2' : '-100px'} transition="margin-left 0.1s ease" color={textColor}>
              Volver a Garzón
            </Text>
          </Flex>
        </Link>
      </Box>
      <Divider my="3" borderColor="gray.300" />

      {/* Botones de contacto y configuración */}
      <Button
  as="a"
  href="mailto:soporte@localhots"
  target="_blank"
  rel="noopener noreferrer"
  leftIcon={<Icon as={FiLifeBuoy} />}
  colorScheme="teal"
  variant="solid"
  mb="3"
  maxWidth="150px" // Ajusta este valor según tu preferencia
  _hover={{
    bg: 'rgba(255, 255, 255, 0.1)',
  }}
></Button>

<Link to="/user">
  <Button
    leftIcon={<Icon as={FiSettings} />}
    colorScheme="teal"
    variant="solid"
    mb="3"
    maxWidth="150px" // Ajusta este valor según tu preferencia
    _hover={{
      bg: 'rgba(255, 255, 255, 0.1)',
    }}
  ></Button>
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

export default SideBarSales;
