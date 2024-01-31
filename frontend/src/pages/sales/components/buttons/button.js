// ButtonPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonAdmin from './buttonadmin';
import { Divider, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { BsExclamationOctagonFill } from 'react-icons/bs';

const ButtonPanel = () => {
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

  if (
    userRole?.toLowerCase() !== 'j. ventas' &&
    userRole?.toLowerCase() !== 'developer' &&
    userRole?.toLowerCase() !== 'director'
  ) {
    return null;
  }
  

  return (
    <>
      <Divider my="0" />
      <Flex align="center">
        <Tooltip label="Panel únicamente visible para Gerencia" placement="right" hasArrow>
          <Flex>
            <Icon as={BsExclamationOctagonFill} color="red.500" mr="0" />
          </Flex>
        </Tooltip>
      </Flex>
      <ButtonAdmin />
    </>
  );
};

export default ButtonPanel;
