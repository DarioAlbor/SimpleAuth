// ResetPassCard.js
import React, { useState, useEffect } from 'react'; // Agregué import useEffect
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
} from '@chakra-ui/react';
import { HiCheckCircle, HiOutlineLockClosed } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassCard = () => {
    const { token } = useParams();
    const [password, setPassword] = useState(''); // Agregué definición de variables
    const [confirmPassword, setConfirmPassword] = useState(''); // Agregué definición de variables
    const [validToken, setValidToken] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false); // Agregué definición de variables
    const [errorMessage, setErrorMessage] = useState(''); // Agregué definición de variables

    useEffect(() => {
        const validateToken = async () => {
            try {
              const response = await axios.post('http://portal.drogueriagarzon.com:3001/api/login/validate-reset-token', { token });
              setValidToken(response.data.valid);
            } catch (error) {
              console.error('Error validating token:', error);
            }
          };          

        validateToken();
    }, [token]);

    const handleResetPassClick = async () => {
        try {
            const response = await axios.post('http://portal.drogueriagarzon.com:3001/api/login/reset-password', {
                email: 'dario@vefixy.com',
                token,
                newPassword: password,
            });
    
            // Puedes manejar la respuesta de la API y actualizar el estado según sea necesario
            setResetSuccess(true);
        } catch (error) {
            console.error('Error resetting password:', error);
            setErrorMessage('Error al restablecer la contraseña.');
    
            // Agregar esta línea para ver más detalles sobre el error
            console.log('Axios Error Details:', error.response);
        }
    };

    if (!validToken) {
        return <p>Token inválido. No se puede restablecer la contraseña.</p>;
    }

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Restablecer Contraseña</Heading>
                    <FormControl id="password" isRequired>
                        <FormLabel>Nueva Contraseña</FormLabel>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<HiOutlineLockClosed color="gray.300" />}
                            />
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nueva contraseña"
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="confirmPassword" isRequired>
                        <FormLabel>Confirmar Contraseña</FormLabel>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<HiOutlineLockClosed color="gray.300" />}
                            />
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirmar contraseña"
                            />
                        </InputGroup>
                    </FormControl>
                    <Stack spacing={6}>
                        {resetSuccess ? (
                            <Button colorScheme="green" leftIcon={<HiCheckCircle />}>
                                ¡Restablecimiento de contraseña exitoso!
                            </Button>
                        ) : (
                            <Button colorScheme={'blue'} variant={'solid'} onClick={handleResetPassClick}>
                                Restablecer Contraseña
                            </Button>
                        )}
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
                    alt={'Reset Password Image'}
                    objectFit={'cover'}
                    src={'http://portal.portal.drogueriagarzon.com/images/garzonfront.jpg'}
                />
            </Flex>
        </Stack>
    );
};

export default ResetPassCard;