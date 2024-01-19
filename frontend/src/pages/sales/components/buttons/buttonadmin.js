import React, { useState } from 'react';
import { Flex, Icon, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { FiFileText, FiFile, FiChevronDown } from 'react-icons/fi';
import { LuPanelRight } from "react-icons/lu";
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { Link } from 'react-router-dom';

const ButtonAdmin = () => {
  const [isSubMenuExpanded, setIsSubMenuExpanded] = useState(false);

  const textColor = useColorModeValue('white', 'gray.200');

  const handleSubMenuToggle = (e) => {
    e.preventDefault();
    setIsSubMenuExpanded(!isSubMenuExpanded);
  };

  return (
    <Flex direction="column">
      <Link to="#" className="menu-item" onClick={handleSubMenuToggle}>
        <Flex
          align="center"
          _hover={{
            bg: 'rgba(66, 153, 225, 0.8)',
            borderRadius: 'md',
          }}
        >
          <Icon as={LuPanelRight} fontSize="20px" />
          <Text className="sidebar-text menu-text" ml={isSubMenuExpanded ? '2' : '2'} color={textColor}>
            Panel remitos <Icon as={FiChevronDown} ml="0" />
          </Text>
        </Flex>
      </Link>

      {isSubMenuExpanded && (
        <VStack spacing="0" align="center">
          <Link to="/sales/admin/panel">
            <Flex
              align="center"
              _hover={{
                bg: 'rgba(66, 153, 225, 0.8)',
                borderRadius: 'md',
              }}
            >
              <Icon as={GoUnverified} fontSize="20px" />
              <Text className="sidebar-text" ml="2" color={textColor}>
                Pendientes
              </Text>
            </Flex>
          </Link>

          {/* Nuevo botón para Aprobados */}
          <Link to="/sales/admin/aprobados">
            <Flex
              align="center"
              _hover={{
                bg: 'rgba(66, 153, 225, 0.8)',
                borderRadius: 'md',
              }}
            >
              <Icon as={MdVerified} fontSize="20px" />
              <Text className="sidebar-text" ml="2" color={textColor}>
                Aprobados
              </Text>
            </Flex>
          </Link>
        </VStack>
      )}
    </Flex>
  );
};

export default ButtonAdmin;
