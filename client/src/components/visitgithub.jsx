import React from 'react';
import { Flex, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaGithub, FaLinkedinIn, FaDiscord } from 'react-icons/fa';

export default function VisitGithub() {
  const handleVisit = (url) => {
    window.open(url, '_blank');
  };

  const buttonBg = useColorModeValue('gray.800', 'gray.700');
  const buttonColor = useColorModeValue('white', 'white');
  const hoverBg = useColorModeValue('gray.300', 'gray.600');

  return (
    <Flex
      align={'center'}
      justify={'center'}
      direction={'column'}
      bg="transparent"
    >
      <Button
        leftIcon={<Icon as={FaGithub} />}
        bg={buttonBg}
        color={buttonColor}
        variant="outline"
        onClick={() => handleVisit('https://github.com/DarioAlbor/SimpleAuth')}
        _hover={{
          bg: hoverBg,
          color: useColorModeValue('black', 'white'),
        }}
        _active={{
          bg: useColorModeValue('gray.400', 'gray.800'),
          color: useColorModeValue('black', 'white'),
        }}
        mb={2}
      >
        VISITA EL REPOSITORIO
      </Button>
      <Flex align={'center'} justify={'center'} gap={4}>
        <Icon
          as={FaLinkedinIn}
          boxSize={5}
          cursor="pointer"
          color={useColorModeValue('gray.600', 'white')}
          _hover={{ color: 'blue.500' }}
          onClick={() => handleVisit('https://www.linkedin.com/in/albordario/')}
        />
        <Icon
          as={FaDiscord}
          boxSize={5}
          cursor="pointer"
          color={useColorModeValue('gray.600', 'white')}
          _hover={{ color: 'blue.500' }}
          onClick={() => handleVisit('https://discordapp.com/users/1180602927795159111')}
        />
      </Flex>
    </Flex>
  );
}