import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  Link,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

function SignupCard({ handleSignUp }) {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [emailFormatValid, setEmailFormatValid] = useState(false);

  const navigate = useNavigate();

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://portal.drogueriagarzon.com:3001/api/checkEmail/${email}`);
      const data = await response.json();

      if (data.exists === 'Si') {
        setEmailExists(true);
      } else {
        setEmailExists(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (email && !errors.email && !emailExists && emailFormatValid && firstName && lastName && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, errors.email, emailExists, emailFormatValid, firstName, lastName, password]);

  const handleEmailBlur = () => {
    if (email) {
      checkEmailExists(email);
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailExists(false);
    setIsRegistrationSuccess(false);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmailFormatValid(emailRegex.test(newEmail));
  };

const handleSignUpClick = async () => {
  try {
    const errors = {};

    if (!firstName) {
      errors.firstName = 'El nombre es obligatorio';
    }

    if (!lastName) {
      errors.lastName = 'El apellido es obligatorio';
    }

    if (!email) {
      errors.email = 'El correo es obligatorio';
    } else if (!emailFormatValid) {
      errors.email = 'El correo no tiene un formato válido';
    }

    if (!password) {
      errors.password = 'La contraseña es obligatoria';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0 && !emailExists) {
      const response = await handleSignUp(firstName, lastName, email, password);

      if (response && response.message) {
        if (response.message === 'Usuario registrado exitosamente') {
          setIsRegistrationSuccess(true);
          toast.success("Te has registrado correctamente, en breve serás redirigido. 💙");

          // Agregar espera de 10 segundos antes de redirigir
          setTimeout(() => {
            navigate('/login');
          }, 10000);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Registro
          </Heading>
          <Text fontSize={'lg'} color={'white.600'} textAlign={'center'}>
        ¡Mantenete enterado de todas nuestras novedades en Garzon! 💙
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box w="50%">
                <FormControl id="firstName" isRequired isInvalid={!!errors.firstName}>
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text" onChange={(e) => setFirstName(e.target.value)} />
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box w="50%">
                <FormControl id="lastName" isRequired isInvalid={!!errors.lastName}>
                  <FormLabel>Apellido</FormLabel>
                  <Input type="text" onChange={(e) => setLastName(e.target.value)} />
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired isInvalid={!!errors.email}>
              <FormLabel>Correo electrónico</FormLabel>
              <InputGroup>
                <Input
                  type="email"
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  value={email}
                />
    <InputRightElement>
      {email ? (
        emailExists ? (
          <WarningIcon color="red.500" />
        ) : emailFormatValid ? (
          <CheckIcon color="green.500" />
        ) : (
          <WarningIcon color="red.500" />
        )
      ) : null}
    </InputRightElement>
              </InputGroup>
              {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
              {emailExists && (
                <Alert status="error" borderRadius="md" mt={2}>
                  <AlertIcon />
                  <AlertTitle mr={2}>¡Este correo electrónico ya está registrado!</AlertTitle>
                </Alert>
              )}
            </FormControl>
            <FormControl id="password" isRequired isInvalid={!!errors.password}>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                size="lg"
                bg={isRegistrationSuccess ? 'green.400' : 'blue.400'}
                color={'white'}
                _hover={{
                  bg: isRegistrationSuccess ? 'green.500' : 'blue.500',
                }}
                rightIcon={isRegistrationSuccess ? <CheckIcon /> : null}
                onClick={handleSignUpClick}
                isDisabled={isButtonDisabled}
                opacity={isButtonDisabled ? '0.5' : '1'}
              >
                {isRegistrationSuccess ? 'Registrado' : 'Registrarme'}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                ¿Ya tienes una cuenta? <Link href="/login" color={'blue.400'}>
                  Ingresar
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignupCard;
