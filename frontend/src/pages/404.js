import React, { useEffect } from 'react';
import { Flex, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirige a la página principal después de 5 segundos
        const redirectTimeout = setTimeout(() => {
            navigate('/');
        }, 5000);

        // Limpia el timeout al desmontar el componente
        return () => clearTimeout(redirectTimeout);
    }, [navigate]);

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            h="100vh"
        >
            <Icon as={FaHome} boxSize={8} color="teal.500" mb={4} />
            <Heading fontSize="2xl" mb={4}>
                Página no encontrada
            </Heading>
            <Text mb={4}>Lo sentimos, la página que buscas no existe.</Text>
            <Button
                leftIcon={<FaHome />}
                colorScheme="teal"
                variant="outline"
                onClick={() => navigate('/')}
            >
                Serás redirigido automaticamente a la página principal
            </Button>
        </Flex>
    );
};

export default NotFound;
