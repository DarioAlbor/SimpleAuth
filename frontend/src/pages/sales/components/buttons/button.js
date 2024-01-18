// ButtonPanel.js
import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import ButtonAdmin from './buttonadmin';

const ButtonPanel = () => {
  const [userRole, setUserRole] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);

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

  useEffect(() => {
    setIsMaximized(false); 
  }, [userRole]); 

  if (userRole?.toLowerCase() === 'vendedor') {
    return null;
  }

  const toggleMaximized = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <Box>
      <Tooltip label="Administracion" placement="right" hasArrow>
        <IconButton
          aria-label="Maximize"
          icon={<ChevronDownIcon />}
          onClick={toggleMaximized}
          variant="outline"
        />
      </Tooltip>
      {isMaximized && <ButtonAdmin />}
    </Box>
  );
};

export default ButtonPanel;
