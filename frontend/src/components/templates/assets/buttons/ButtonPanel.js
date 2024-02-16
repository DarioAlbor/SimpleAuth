import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon, Button, MenuItem, MenuList, MenuDivider } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ButtonPanel = ({ isHovered, setIsHovered }) => {
  const [userRole, setUserRole] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState(false);

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

  if (!userRole || userRole?.toLowerCase() === 'cliente') {
    return null;
  }

  const renderSubMenuItems = () => {
    switch (userRole?.toLowerCase()) {
      case 'developer':
        return (
          <>
            <MenuItem>
              <Link to="/developer">Desarrollador</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/director">Director</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/design">Diseñador</Link>
            </MenuItem>
            <MenuItem> 
              <Link to="/sales">Ventas</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/compras">Compras</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/finance">Administracion</Link>
            </MenuItem>
          </>
        );
      case 'director':
        return (
          <>
            <MenuItem>
              <Link to="/director">Director</Link>
            </MenuItem>
          </>
        );
      case 'designer':
        return (
          <>
            <MenuItem>
              <Link to="/design">Diseñador</Link>
            </MenuItem>
          </>
        );
      case 'vendedor':
      case 'j. ventas':
        return (
          <>
            <MenuItem>
              <Link to="/sales">Ventas</Link>
            </MenuItem>
          </>
        );
        case 'comprador':
          return (
            <>
              <MenuItem>
                <Link to="/compras">Compras</Link>
              </MenuItem>
            </>
          );
      case 'administracion':
        return (
          <>
            <MenuItem>
              <Link to="/finance">Administracion</Link>
            </MenuItem>
          </>
        );
      default:
        return null;
    }
  };
  

  return (
    <div style={{ position: 'relative' }}>
      <MenuDivider />
      <Button
        rounded="lg"
        variant="link"
        cursor="pointer"
        _hover={{
          bg: 'black.400',
          color: 'cyan',
        }}
        onClick={() => setSubmenuOpen(!submenuOpen)}
      >
        <MenuList>
        Departamentos <Icon as={FiChevronDown} />
        </MenuList>
      </Button>
      {submenuOpen && (
        <div style={{ position: 'absolute', top: '100%', backgroundColor: 'black', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: '999' }}>
          {renderSubMenuItems()}
        </div>
      )}
    </div>
  );
};

export default ButtonPanel;