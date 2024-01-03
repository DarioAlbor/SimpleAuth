// ButtonPanel.js
import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, Button, Icon, Flex } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { RiAdminFill } from 'react-icons/ri';
import axios from 'axios';
import ButtonDeveloper from './ButtonDeveloper';
import ButtonDirector from './ButtonDirector';
import ButtonDesigner from './ButtonDesigner';
import ButtonSales from './ButtonSales';

const ButtonPanel = ({ isHovered, setIsHovered, setIsExpanded }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://drogueriagarzon.com:3001/api/user/getRole', { withCredentials: true });
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
      }
    };

    fetchUserRole();
  }, []);

  if (userRole?.toLowerCase() === 'cliente') {
    return null; // No renderizar nada si el rol es "Cliente"
  }

  let ButtonComponent;

  switch (userRole?.toLowerCase()) {
    case 'developer':
      ButtonComponent = <ButtonDeveloper isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />;
      break;
    case 'director':
      ButtonComponent = <ButtonDirector isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />;
      break;
    case 'diseñador':
      ButtonComponent = <ButtonDesigner isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />;
      break;
    case 'vendedor':
      ButtonComponent = <ButtonSales isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />;
      break;
    default:
      ButtonComponent = null; // No renderizar nada si el rol no coincide con los casos anteriores
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="lg"
        variant="link"
        cursor="pointer"
        _hover={{
          bg: 'black.400',
          color: 'cyan',
        }}
        ml="2"
        mt="7"
        mb="0"
        px="0"
        py="0"
      >
        <Flex align="center">
          <Icon as={RiAdminFill} fontSize="xl" mr="0" />
          <Icon as={FiChevronDown} />
        </Flex>
      </MenuButton>
      <MenuList
  style={{
    backgroundColor: 'transparent',
    color: 'red', // Cambia el color del texto a negro u otro color que sea visible
  }}
>
  {ButtonComponent}
</MenuList>

    </Menu>
  );
};

export default ButtonPanel;