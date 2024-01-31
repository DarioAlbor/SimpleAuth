import React, { useState, useEffect } from 'react';
import { Flex, Box, Image, Button } from '@chakra-ui/react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        // Hacer la solicitud al backend para obtener la lista de im�genes
        fetch('http://portal.drogueriagarzon.com:3001/api/getcarousel')
            .then((response) => response.json())
            .then((data) => {
                setImages(data.images);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de im�genes:', error);
            });
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <Flex direction="column" align="center">
            <Flex direction="column" maxW="1000px" overflow="hidden" mb="10">
                <Box position="relative">
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={image} // Aqu� simplemente asignamos la URL base64 directamente
                            alt={`Banner ${index + 1}`}
                            display={index === currentIndex ? 'block' : 'none'}
                            w="100%"
                        />
                    ))}
                </Box>
                <Flex justify="space-between" w="100%" mt="0">
                    <Button onClick={prevSlide} fontSize="2xl" colorScheme="teal">
                        {'<'}
                    </Button>
                    <Button onClick={nextSlide} fontSize="2xl" colorScheme="teal">
                        {'>'}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Carousel;