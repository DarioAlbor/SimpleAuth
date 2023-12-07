import React from 'react';
import {
    Button,
    Flex,
    Text,
    Heading,
    Stack,
    Box,
    Icon,
    Container,
} from '@chakra-ui/react';
import {
    FcAbout,
    FcAssistant,
    FcCollaboration,
    FcDonate,
    FcManager,
} from 'react-icons/fc';
import './css/about.css';

interface CardProps {
    heading: string;
    description: string;
    icon: React.ReactNode;
    href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
    return (
        <Box className="card">
            <Stack align={'start'} spacing={1}>
                <Flex className="cardIcon">
                    {icon}
                </Flex>
                <Box className="cardTitle">
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} className="cardDescription">
                        {description}
                    </Text>
                </Box>
                <Button variant={'link'} colorScheme={'blue'} size={'sm'} className="cardButton">
                    Quiero saber más
                </Button>
            </Stack>
        </Box>
    );
};
export default function GridListWith() {
    return (
        <Box p={0} className="about-container">
            <Stack spacing={3} as={Container} maxW={'8xl'} textAlign={'center'}>
                <Heading fontSize={{ base: '2xl', sm: '5xl' }} fontWeight={'bold'}>
                    ¡Nos estamos renovando para vos!
                </Heading>
                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    Esté nuevo año lo queremos comenzar de la mejor manera,
                    es por eso que hemos decidido sorprenderte. 😉
                </Text>
            </Stack>

            <Box className="cardContainer">
                <Card
                    heading={'Asistente virtual'}
                    icon={<Icon as={FcAssistant} w={10} h={10} />}
                    description={'Contamos con un asistente virtual las 24 horas del día, lista para solucionar todos tus problemas.'}
                    href={'#'}
                />  
                <Card
                    heading={'Contacto directo'}
                    icon={<Icon as={FcCollaboration} w={10} h={10} />}
                    description={'¿Hay algún problema con tu pedido? ¡Ningun problema! Ahora podes solucionarlo acá mismo.'}
                    href={'#'}
                />
                <Card
                    heading={'¡Necesito crédito!'}
                    icon={<Icon as={FcDonate} w={10} h={10} />}
                    description={'Desde la nueva aplicación podrás solicitar crédito como así también consultarlo y la opción de saldarlo. ¿Qué esperas?'}
                    href={'#'}
                />
                <Card
                    heading={'Mi cuenta'}
                    icon={<Icon as={FcManager} w={10} h={10} />}
                    description={'Ya no hace falta ponerte en contacto con nosotros para saber tu informe. Podes consultar el mismo desde la sección "Mi cuenta" en el extremo derecho.'}
                    href={'#'}
                />
                <Card
                    heading={'F.A.Q'}
                    icon={<Icon as={FcAbout} w={10} h={10} />}
                    description={'¿No he sido lo bastante claro? Podes consultar nuestras preguntas frecuentes y resolver todas tus dudas, ¡Ahora mismo!.'}
                    href={'#'}
                />
            </Box>
        </Box>
    );
}