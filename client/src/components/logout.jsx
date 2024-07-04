import React from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import apiRoutes from '../utils/apiroutes';
import { getAuthHeaders } from '../utils/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ImExit } from "react-icons/im";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${apiRoutes.baseurl}${apiRoutes.userLogout}`, {}, getAuthHeaders());
      localStorage.removeItem('token');
      toast.success('Sesión cerrada correctamente');
      navigate('/login');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      toast.error('Error al cerrar la sesión');
    }
  };

  return (
    <Button
      bg={'red.400'}
      color={'white'}
      _hover={{
        bg: 'red.500',
      }}
      onClick={handleLogout}
      leftIcon={<ImExit />}
    />
  );
};

export default Logout;