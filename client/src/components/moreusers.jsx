import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Flex,
  Stack,
  Text,
  Divider,
  Tooltip,
  IconButton,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import axios from 'axios';
import apiRoutes from '../utils/apiroutes';
import { getAuthHeaders } from '../utils/auth';

const MoreUsers = () => {
  const [users, setUsers] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.700');
  const avatarBgColor = useColorModeValue('gray.200', 'gray.500');
  const { colorMode } = useColorMode();
  const iconBgColor = colorMode === 'light' ? 'gray.800' : 'white';
  const iconColor = colorMode === 'light' ? 'white' : 'black';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiRoutes.baseurl}${apiRoutes.traerUsuarios}`, getAuthHeaders());
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    const interval = setInterval(fetchUsers, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box position="fixed" right={isExpanded ? '0' : '8'} top="50%" transform="translateY(-50%)" zIndex={10}>
      <Box position="relative">
        <IconButton
          icon={isExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          onClick={handleExpand}
          variant="ghost"
          size="md"
          bg={iconBgColor}
          color={iconColor}
          _hover={{ bg: iconBgColor }}
          borderRadius="md"
          boxShadow="md"
          h="80px"
          position="absolute"
          left={isExpanded ? '-40px' : '100%'}
          top={isExpanded ? '150px' : '100%'}
          transform="translateY(-50%)"
        />
      </Box>
      <Box
        w={isExpanded ? '300px' : '0px'}
        bg={bgColor}
        bgGradient="radial-gradient(circle at 80% 70%, rgba(75, 0, 130, 0.2), transparent 50%), radial-gradient(circle at 70% 70%, rgba(75, 0, 130, 0.2), transparent 50%)"
        rounded={'lg'}
        boxShadow={'lg'}
        p={isExpanded ? 4 : 0}
        position="relative"
        overflow="hidden"
        transition="width 0.5s ease, padding 0.5s ease"
      >
        {isExpanded && (
          <Stack spacing={4}>
            {users.map((user, index) => (
              <Box key={user._id}>
                <Flex alignItems={'center'}>
                  <Tooltip label={user.isactive === "true" ? 'Conectado' : 'Desconectado'}>
                    <Avatar
                      src={user.imgProfile || ''}
                      name={user.firstName}
                      bg={user.imgProfile ? 'transparent' : avatarBgColor}
                    >
                      {user.isactive === "true" ? (
                        <Box
                          position="absolute"
                          bottom="0"
                          right="0"
                          bg="green.500"
                          h="12px"
                          w="12px"
                          borderRadius="full"
                          border="2px solid white"
                        />
                      ) : (
                        <Box
                          position="absolute"
                          bottom="0"
                          right="0"
                          bg="gray.500"
                          h="12px"
                          w="12px"
                          borderRadius="full"
                          border="2px solid white"
                        />
                      )}
                    </Avatar>
                  </Tooltip>
                  <Box ml={3}>
                    <Text fontWeight={'bold'}>{user.firstName}</Text>
                  </Box>
                </Flex>
                {index < users.length - 1 && <Divider mt={4} />}
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default MoreUsers;