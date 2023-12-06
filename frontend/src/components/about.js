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
                    Learn more
                </Button>
            </Stack>
        </Box>
    );
};
export default function GridListWith() {
    return (
        <Box p={5} className="about-container">
            <Stack spacing={3} as={Container} maxW={'8xl'} textAlign={'center'}>
                <Heading fontSize={{ base: '2xl', sm: '5xl' }} fontWeight={'bold'}>
                    Short heading
                </Heading>
                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
                    obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
                </Text>
            </Stack>

            <Box className="cardContainer">
                <Card
                    heading={'Heading'}
                    icon={<Icon as={FcAssistant} w={10} h={10} />}
                    description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
                    href={'#'}
                />  
                <Card
                    heading={'Heading'}
                    icon={<Icon as={FcCollaboration} w={10} h={10} />}
                    description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
                    href={'#'}
                />
                <Card
                    heading={'Heading'}
                    icon={<Icon as={FcDonate} w={10} h={10} />}
                    description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
                    href={'#'}
                />
                <Card
                    heading={'Heading'}
                    icon={<Icon as={FcManager} w={10} h={10} />}
                    description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
                    href={'#'}
                />
                <Card
                    heading={'Heading'}
                    icon={<Icon as={FcAbout} w={10} h={10} />}
                    description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
                    href={'#'}
                />
            </Box>
        </Box>
    );
}