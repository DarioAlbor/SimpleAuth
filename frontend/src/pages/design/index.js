import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Flex,
    Heading,
    Text,
    Spinner,
    Button,
    Stack,
    Box,
    Center,
    Portal,
    ChakraProvider,
    ButtonGroup,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const DesignPage = () => {
    const [userInfo, setUserInfo] = useState({ role: null, name: null });
    const [loading, setLoading] = useState(true);
    const [backgroundColor, setBackgroundColor] = useState(0);
    const [isPdfUploaded, setIsPdfUploaded] = useState(false);
    const [showBannerButtons, setShowBannerButtons] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const colors = [
        'rgba(253, 253, 150, 0.7)',
        'rgba(178, 223, 138, 0.7)',
        'rgba(255, 189, 189, 0.7)',
        'rgba(191, 198, 255, 0.7)',
        'rgba(255, 168, 187, 0.7)',
        'rgba(168, 206, 255, 0.7)',
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://drogueriagarzon.com:3001/api/user/getuserinfo', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
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

        if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('bannerName', selectedBanner ? selectedBanner.replace('Banner ', '') : '');

            try {
                const response = await fetch('http://drogueriagarzon.com:3001/api/uploadbanner', {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                });

                if (response.ok) {
                    console.log(`Archivo de imagen para ${selectedBanner || 'unknown'} subido exitosamente.`);

                    // Mostrar el mensaje de éxito
                    setShowSuccessMessage(true);

                    // Ocultar el mensaje después de 5 segundos
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 5000);
                } else {
                    console.error('Error al subir el archivo de imagen.');
                }
            } catch (error) {
                console.error('Error al subir el archivo de imagen:', error);
            }
        } else {
            alert('Por favor, seleccione un archivo de imagen (jpeg, png, gif).');
        }
    };

    const renderBannerButtons = () => {
        return (
            <Center mt="4">
                <ButtonGroup spacing="4">
                    <Button
                        colorScheme="teal"
                        onClick={() => handleBannerButtonClick('Banner 1')}
                        bg={colors[backgroundColor]}
                    >
                        Banner 1
                    </Button>
                    <Button
                        colorScheme="teal"
                        onClick={() => handleBannerButtonClick('Banner 2')}
                        bg={colors[backgroundColor]}
                    >
                        Banner 2
                    </Button>
                    <Button
                        colorScheme="teal"
                        onClick={() => handleBannerButtonClick('Banner 3')}
                        bg={colors[backgroundColor]}
                    >
                        Banner 3
                    </Button>
                </ButtonGroup>
                <input
                    id="bannerInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </Center>
        );
    };

    const handleBannerButtonClick = (bannerName) => {
        console.log('Banner seleccionado:', bannerName);
        setSelectedBanner(bannerName);
        const fileInput = document.getElementById('bannerInput');
        fileInput.click();
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
                    {showSuccessMessage && (
                        <Portal>
                            <Center
                                position="fixed"
                                top="0"
                                left="0"
                                bottom="0"
                                right="0"
                                bg="rgba(0, 0, 0, 0.7)"
                                color="white"
                            >
                                <Box>
                                    <CheckIcon boxSize={16} color="green.500" />
                                    <Text fontSize="lg" mt={2}>
                                        Imagen cargada correctamente
                                    </Text>
                                </Box>
                            </Center>
                        </Portal>
                    )}
                    <Button colorScheme="teal" onClick={() => setShowBannerButtons(!showBannerButtons)}>
                        Banners
                    </Button>
                    <Button colorScheme="teal">Tema</Button>
                </Stack>
                {showBannerButtons && renderBannerButtons()}
            </Flex>
        </ChakraProvider>
    );
};

export default DesignPage;
