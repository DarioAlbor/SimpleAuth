// ButtonPanel.js
import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, Button, Icon, Flex } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { RiAdminFill } from 'react-icons/ri';
import axios from 'axios';
import Scrollbar from 'react-scrollbar';
import ButtonDeveloper from './ButtonDeveloper';
import ButtonDirector from './ButtonDirector';
import ButtonDesigner from './ButtonDesigner';
import ButtonSales from './ButtonSales';
import ButtonAdmin from './ButtonAdmin';

const ButtonPanel = ({ isHovered, setIsHovered, setIsExpanded }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user/getRole', { withCredentials: true });
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
      }
    };

    fetchUserRole();
  }, []);

  if (userRole?.toLowerCase() === 'cliente') {
    return null;
  }

  let ButtonComponents = [];

  switch (userRole?.toLowerCase()) {
    case 'developer':
      ButtonComponents.push(<ButtonDeveloper key="developer" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      ButtonComponents.push(<ButtonDirector key="director" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      ButtonComponents.push(<ButtonDesigner key="designer" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      ButtonComponents.push(<ButtonSales key="sales" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      ButtonComponents.push(<ButtonAdmin key="admin" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      break;
    case 'director':
      ButtonComponents.push(<ButtonDeveloper key="developer" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      ButtonComponents.push(<ButtonDirector key="director" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      ButtonComponents.push(<ButtonDesigner key="designer" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      ButtonComponents.push(<ButtonSales key="sales" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      ButtonComponents.push(<ButtonAdmin key="admin" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      break;
    case 'designer':
      ButtonComponents.push(<ButtonDesigner key="designer" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      break;
    case 'vendedor':
      ButtonComponents.push(<ButtonSales key="sales" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
      break;
      case 'j. ventas':
        ButtonComponents.push(<ButtonSales key="sales" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
        break;
      case 'administracion':
          ButtonComponents.push(<ButtonAdmin key="admin" isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />);
          break;
    default:
      break;
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
        <Scrollbar style={{ maxHeight: '200px' }}> {/* Ajusta la altura máxima según sea necesario */}
          {ButtonComponents.map((ButtonComponent) => (
            <React.Fragment key={ButtonComponent.key}>{ButtonComponent}</React.Fragment>
          ))}
        </Scrollbar>
      </MenuList>
    </Menu>
  );
};

export default ButtonPanel;