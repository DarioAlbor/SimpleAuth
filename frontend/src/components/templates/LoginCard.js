import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  InputGroup,
  InputRightElement,
  IconButton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff, HiCheckCircle } from 'react-icons/hi';

export default function SplitScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate(); // Inicializando useNavigate

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
      } else {
        // Limpiar mensaje de error si la solicitud fue exitosa
        setErrorMessage('');
        setLoginSuccess(true);

        // Redirigir al usuario después de un inicio de sesión exitoso
        setTimeout(() => {
          navigate('/inicio'); // Utilizando navigate en lugar de history
        }, 5000); // Redirigir después de 5 segundos
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Inicie sesión en su cuenta</Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Correo electrónico</FormLabel>
            <Input type="email" onChange={handleEmailChange} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                pr="4.5rem"
                onChange={handlePasswordChange}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={handleTogglePassword}
                  icon={showPassword ? <HiEyeOff /> : <HiEye />}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Checkbox>Recordarme</Checkbox>
              <Text color={'blue.500'}>Recuperar contraseña</Text>
            </Stack>
            {loginSuccess ? (
              <Button colorScheme="green" leftIcon={<HiCheckCircle />}>
              </Button>
            ) : (
              <Button colorScheme={'blue'} variant={'solid'} onClick={handleLoginClick}>
                Ingresar
              </Button>
            )}
            <Button colorScheme={'gray'} variant={'solid'}>
              <Link to="/register">¿No tienes cuenta?</Link>
            </Button>
          </Stack>
          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}
