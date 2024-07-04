import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import apiRoutes from '../utils/apiroutes';
import Github from './visitgithub';

export default function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiRoutes.baseurl}${apiRoutes.userLogin}`, {
        email: formData.email,
        password: formData.password
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Almacenar el token en localStorage
      toast.success('Inicio de sesión exitoso!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast.error('Error iniciando sesión. Verifica tus credenciales.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleNavigate = () => {
    navigate('/register');
  };

  const bgOverlayGradient = useColorModeValue(
    'radial-gradient(circle at 30% 30%, rgba(0, 0, 255, 0.2), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0, 0, 255, 0.2), transparent 50%)',
    'radial-gradient(circle at 30% 30%, rgba(0, 0, 255, 0.2), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0, 0, 255, 0.2), transparent 50%)'
  );

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bgGradient="linear(to-r, gray.800, blue.900)"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: bgOverlayGradient,
        zIndex: 0,
      }}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} position="relative" zIndex={1}>
        <Heading fontSize={'4xl'} color={useColorModeValue('white', 'white')}>Inicia sesión en tu cuenta</Heading>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNavigate}
          style={{ cursor: 'pointer', textAlign: 'center' }}
        >
          <Text
            fontSize={'2xl'}
            bgGradient="linear(to-r, white, gray.300)"
            bgClip="text"
            fontWeight="bold"
            animation="colorChange 2s infinite"
          >
            ¿Aún no tienes una cuenta?
          </Text>
        </motion.div>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          as="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel color={useColorModeValue('gray.800', 'white')}>Correo electrónico</FormLabel>
              <Input type="email" value={formData.email} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color={useColorModeValue('gray.800', 'white')}>Contraseña</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={2}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
              </Stack>
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Ingresar
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Github />
      </Stack>
      <ToastContainer />
    </Flex>
  );
}