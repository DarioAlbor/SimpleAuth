import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Github from './visitgithub';
import axios from 'axios';
import apiRoutes from '../utils/apiroutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos coincidan y no estén vacíos
    if (
      formData.email !== formData.repeatEmail ||
      formData.password !== formData.repeatPassword ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error('Por favor, asegúrate de que todos los campos estén completos y que los correos y contraseñas coincidan.');
      return;
    }

    try {
      await axios.post(`${apiRoutes.baseurl}${apiRoutes.crearUsuario}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        imgProfile: ''
      });
      toast.success('Usuario creado exitosamente');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(`Error creando el usuario: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const bgGradient = "linear(to-r, gray.800, blue.900)";
  const formBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('white', 'white');
  const labelColor = useColorModeValue('black', 'white');
  const buttonBg = useColorModeValue('blue.400', 'blue.500');
  const buttonHoverBg = useColorModeValue('blue.500', 'blue.600');

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bgGradient={bgGradient}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.2), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0, 255, 255, 0.2), transparent 50%)',
        zIndex: 0,
      }}
    >
      <Stack spacing={3} mx={'auto'} maxW={'lg'} px={6} position="relative" zIndex={1}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color={textColor}>
            Regístrate
          </Heading>
          <Text fontSize={'lg'} color={textColor}>
            Conoce todas nuestras funciones ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={formBg}
          boxShadow={'lg'}
          p={8}
          as="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel color={labelColor}>Nombre</FormLabel>
                  <Input type="text" value={formData.firstName} onChange={handleInputChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel color={labelColor}>Apellido</FormLabel>
                  <Input type="text" value={formData.lastName} onChange={handleInputChange} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel color={labelColor}>Correo electrónico</FormLabel>
              <Input type="email" value={formData.email} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="repeatEmail" isRequired>
              <FormLabel color={labelColor}>Repetir correo electrónico</FormLabel>
              <Input type="email" value={formData.repeatEmail} onChange={handleInputChange} />
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="password" isRequired>
                  <FormLabel color={labelColor}>Contraseña</FormLabel>
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
              </Box>
              <Box>
                <FormControl id="repeatPassword" isRequired>
                  <FormLabel color={labelColor}>Repetir contraseña</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} value={formData.repeatPassword} onChange={handleInputChange} />
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
              </Box>
            </HStack>
            <Stack>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={buttonBg}
                color={'white'}
                _hover={{
                  bg: buttonHoverBg,
                }}
              >
                Registrarme
              </Button>
            </Stack>
            <Stack>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ cursor: 'pointer', textAlign: 'center' }}
                onClick={() => navigate('/login')}
              >
                <Text
                  fontSize={'md'}
                  bgGradient="linear(to-r, white, white)"
                  bgClip="text"
                  fontWeight="bold"
                  color={labelColor}
                >
                  ¿Ya estás registrado? Inicia sesión
                </Text>
              </motion.div>
            </Stack>
          </Stack>
        </Box>
        <Github />
      </Stack>
      <ToastContainer />
    </Flex>
  );
}