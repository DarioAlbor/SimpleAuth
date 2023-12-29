// ForgotPassCard.js
import React, { useState } from 'react';
import {
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Alert,
    AlertIcon,
    Flex,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react';
import { HiCheckCircle, HiOutlineMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ForgotPassCard = ({ handleForgotPassClick, setEmail, resetSuccess, errorMessage }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Recuperar Contraseña</Heading>
                    <FormControl id="email" isRequired>
                        <FormLabel>Correo electrónico</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<HiOutlineMail color="gray.300" />} />
                            <Input
                                type="email"
                                onChange={handleEmailChange}
                                placeholder="tucorreo@dominio.com"
                            />
                        </InputGroup>
                        <Text mt={2} fontSize="sm" color="gray.500">
                            Te enviaremos un mensaje con un enlace que te permitirá restablecer tu contraseña.
                        </Text>
                    </FormControl>
                    <Stack spacing={6}>
                        {resetSuccess ? (
                            <Button colorScheme="green" leftIcon={<HiCheckCircle />}>
                                ¡Restablecimiento de contraseña exitoso!
                            </Button>
                        ) : (
                            <Button colorScheme={'blue'} variant={'solid'} onClick={handleForgotPassClick}>
                                Restablecer Contraseña
                            </Button>
                        )}
                        <Button colorScheme={'gray'} variant={'solid'}>
                            <Link to="/login">Volver al inicio de sesión</Link>
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
                    alt={'Forgot Password Image'}
                    objectFit={'cover'}
                    src={'http://portal.drogueriagarzon.com/images/garzonfront.jpg'}
                />
            </Flex>
        </Stack>
    );
};

export default ForgotPassCard;