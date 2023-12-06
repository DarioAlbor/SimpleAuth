import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Heading, Text, Spinner, Button, Stack, Box, Center, Portal, ChakraProvider } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const DesignPage = () => {
    const [userInfo, setUserInfo] = useState({ role: null, name: null });
    const [loading, setLoading] = useState(true);
    const [backgroundColor, setBackgroundColor] = useState(0);
    const [isPdfUploaded, setIsPdfUploaded] = useState(false);

    const colors = [
        'rgba(200, 150, 200, 0.5)',
        'rgba(150, 200, 200, 0.5)',
        'rgba(200, 200, 150, 0.5)',
        'rgba(150, 200, 200, 0.5)',
        'rgba(200, 150, 150, 0.5)',
        'rgba(150, 150, 200, 0.5)',
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener la información del usuario
                const response = await fetch('http://localhost:3001/api/user/getuserinfo', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();

                // Actualizar el estado
                setUserInfo({ role: data.user.role, name: data.user.firstName });
            } catch (error) {
                console.error('Error al obtener información del usuario:', error);
            } finally {
                setLoading(false);
            }
        };

        const intervalId = setInterval(() => {
            setBackgroundColor((prevColor) => (prevColor + 1) % colors.length);
        }, 3000);

        fetchData();

        return () => clearInterval(intervalId);
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file && file.type === 'application/pdf') {
            const formData = new FormData();
            formData.append('pdf', file);

            try {
                const response = await fetch('http://localhost:3001/api/uploadpdf', {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                });

                if (response.ok) {
                    setIsPdfUploaded(true);

                    // Después de 2 segundos, resetear el estado
                    setTimeout(() => {
                        setIsPdfUploaded(false);
                    }, 2000);
                } else {
                    setIsPdfUploaded(false);
                    console.error('Error al subir el archivo PDF.');
                }
            } catch (error) {
                setIsPdfUploaded(false);
                console.error('Error al subir el archivo PDF:', error);
            }
        } else {
            alert('Por favor, seleccione un archivo PDF.');
        }
    };

    return (
        <ChakraProvider>
            <Flex direction="column" p={8} textAlign="center">
                <Link to="/">
                    <Text fontSize="md" mb={2} color="teal.500" cursor="pointer" _hover={{ color: 'teal.600' }}>
                        {'<< Volver al sitio'}
                    </Text>
                </Link>
                <Heading
                    mb={4}
                    style={{
                        background: colors[backgroundColor],
                        padding: '10px',
                        borderRadius: '8px',
                        transition: 'background 0.5s ease',
                    }}
                >
                    Panel de Diseño
                </Heading>
                <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                    <Text fontSize="xl">¡Bienvenido, {userInfo.role} {userInfo.name || 'Usuario'}!</Text>
                </Box>
                <Stack direction="row" spacing={4} justify="center">
                    <Button colorScheme="teal" onClick={() => document.getElementById('fileInput').click()}>
                        Revista
                    </Button>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    {isPdfUploaded && (
                        <Portal>
                            <Center
                                position="fixed"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                bg="rgba(0, 0, 0, 0.5)"
                                borderRadius="md"
                                p={4}
                                color="white"
                            >
                                <Box>
                                    <CheckIcon boxSize={8} />
                                </Box>
                            </Center>
                        </Portal>
                    )}
                    <Button colorScheme="teal">Banners</Button>
                    <Button colorScheme="teal">Tema</Button>
                </Stack>
            </Flex>
        </ChakraProvider>
    );
};

export default DesignPage;
