import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text, Spinner, Button, Stack, Box } from '@chakra-ui/react';

const DesignPage = () => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/user/getRole', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                console.log('data:', data);  // Agregado para verificar
                setUserRole(data.role);
            } catch (error) {
                console.error('Error al obtener el rol del usuario:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    if (loading) {
        return (
            <Flex align="center" justify="center" minH="80vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <Flex direction="column" p={8}>
            <Heading mb={4}>Panel de Diseño</Heading>
            <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                <Text fontSize="xl">¡Bienvenido, Diseñador!</Text>
                {/* Contenido específico para el diseñador */}
                {/* Aquí puedes agregar gráficos, herramientas, etc. */}
            </Box>
            <Stack direction="row" spacing={4}>
                <Button colorScheme="teal">Acción 1</Button>
                <Button colorScheme="teal">Acción 2</Button>
                <Button colorScheme="teal">Acción 3</Button>
            </Stack>
        </Flex>
    );
};

export default DesignPage;
