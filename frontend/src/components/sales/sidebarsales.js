import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, VStack, Box, Text, Icon, Divider, Button } from '@chakra-ui/react';
import { FiHome, FiUser, FiArrowLeft, FiLifeBuoy, FiSettings } from 'react-icons/fi';

const SideBarSales = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-end"
      h="100vh"
      w="200px"
      bg="rgba(66, 153, 225, 0.6)"
      color="white"
      p="4"
    >
      <VStack spacing="4" align="flex-start">
        <Link to="/sales">
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
            transition="background 0.3s ease"
            p="2"
          >
            <Icon as={FiHome} fontSize="20px" />
            <Text ml="2">Inicio</Text>
          </Flex>
        </Link>
        <Link to="/sales/chat">
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
            transition="background 0.3s ease"
            p="2"
          >
            <Icon as={FiUser} fontSize="20px" />
            <Text ml="2">Chat</Text>
          </Flex>
        </Link>
      </VStack>
      <Box mt="auto">
        <Link to="/">
          <Flex
            align="center"
            _hover={{
              bg: 'rgba(66, 153, 225, 0.8)',
              borderRadius: 'md',
            }}
            transition="background 0.3s ease"
            p="2"
          >
            <Icon as={FiArrowLeft} fontSize="20px" />
            <Text ml="1">Volver a Garzón</Text>
          </Flex>
        </Link>
      </Box>
      <Divider my="2" borderColor="gray.300" />
      <Button
        as="a"
        href="mailto:soporte@drogueriagarzon.com"
        target="_blank"
        rel="noopener noreferrer"
        leftIcon={<Icon as={FiLifeBuoy} />}
        colorScheme="teal"
        variant="solid"
        mb="2"
      >
        Necesito Ayuda
      </Button>
      <Link to="/user">
        <Button
          leftIcon={<Icon as={FiSettings} />}
          colorScheme="teal"
          variant="solid"
          mb="2"
        >
          Configuración
        </Button>
      </Link>
      <Divider my="2" borderColor="gray.300" />
    </Flex>
  );
};

export default SideBarSales;
