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
  FiArrowLeft,
  FiLifeBuoy,
  FiSettings,
  FiChevronDown,
  FiMail,
} from 'react-icons/fi';
import './css/sidebarcompras.css';
import { GoUnverified } from "react-icons/go";
import { LuPanelRight } from "react-icons/lu";
import { MdOutlineAttachMoney } from "react-icons/md";

const SidebarCompras = () => {
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
        <Link to="/compras">
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
            <Icon as={LuPanelRight} fontSize="20px" />
            <Text className="sidebar-text menu-text" ml={isHovered ? '2' : '-100px'} color={textColor}>
              Panel Remitos <Icon as={FiChevronDown} ml="2" />
            </Text>
          </Flex>
        </Link>

        {/* Submenú fijo de "Remitos" */}
        {isSubMenuExpanded && (
          <VStack spacing="5" align="center">
            <Link to="/compras/remitos/pendientes">
              <Flex
                align="center"
                _hover={{
                  bg: 'rgba(66, 153, 225, 0.8)',
                  borderRadius: 'md',
                }}
              >
                <Icon as={GoUnverified} fontSize="20px" />
                <Text className="sidebar-text" ml={isHovered ? '2' : '-100px'} color={textColor}>
                  Pendientes
                </Text>
              </Flex>
            </Link>
          </VStack>
        )}

{/*SECCION PRECIOS*/}
<VStack spacing="5" align="center">
      <a href="/" rel="noopener noreferrer">
  <Flex
    align="center"
    _hover={{
      bg: 'rgba(66, 153, 225, 0.8)',
      borderRadius: 'md',
    }}
  >
    <Icon as={MdOutlineAttachMoney} fontSize="20px" />
    <Text className="sidebar-text" ml={isHovered ? '2' : '-200px'} transition="margin-left 0.1s ease" color={textColor}>
      Precios
    </Text>
  </Flex>
</a>
</VStack>

{/* SECCION MAIL */}
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
</VStack>

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
  href="mailto:soporte@drogueriagarzon.com"
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

export default SidebarCompras;
