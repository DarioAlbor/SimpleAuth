import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    InputGroup,
    InputRightElement,
    IconButton,
    Alert,
    AlertIcon,
    Image,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { HiCheckCircle } from 'react-icons/hi';  // Agrega esta línea para importar HiCheckCircle

const LoginCard = ({ handleLoginClick, setEmail, setPassword, errorMessage, loginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
                                ¡Inicio de sesión exitoso!
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
                    src={'http://localhost:3000/images/garzonfront.jpg  '}
                />
            </Flex>
        </Stack>
    );
};

export default LoginCard;
