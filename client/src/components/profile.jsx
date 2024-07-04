import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import apiRoutes from '../utils/apiroutes';
import { getAuthHeaders } from '../utils/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from '../components/logout';
import VisitGithub from './visitgithub';

export default function UserProfileEdit() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [iconUrl, setIconUrl] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    email: '',
    password: '',
    imgProfile: '',
  });
  const [originalData, setOriginalData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiRoutes.baseurl}${apiRoutes.userInfo}`, getAuthHeaders());
        const user = response.data;
        setUserData({
          firstName: user.firstName,
          email: user.email,
          password: '*****',
          imgProfile: user.imgProfile || '',
        });
        setOriginalData({
          firstName: user.firstName,
          email: user.email,
          password: '',
          imgProfile: user.imgProfile || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error al obtener los datos del usuario');
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const handlePasswordClick = () => {
    setUserData({ ...userData, password: '' });
    setShowPassword(false);
    setIsEditingPassword(true);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    setUserData({
      ...originalData,
      password: '*****',
    });
    setIsEditingPassword(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiRoutes.baseurl}${apiRoutes.updateUserInfo}`, { password: userData.password }, getAuthHeaders());
      toast.success('Contraseña actualizada');
      setOriginalData(userData);
      setIsEditingPassword(false);
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Error al actualizar la contraseña');
    }
  };

  const handleIconChange = async () => {
    const regex = /\.(jpeg|jpg|png)$/;
    if (regex.test(iconUrl)) {
      try {
        await axios.put(`${apiRoutes.baseurl}${apiRoutes.updateUserInfo}`, { imgProfile: iconUrl }, getAuthHeaders());
        setUserData({ ...userData, imgProfile: iconUrl });
        toast.success('Imagen de perfil actualizada');
        onClose();
      } catch (error) {
        console.error('Error updating profile image:', error);
        toast.error('Error al actualizar la imagen de perfil');
      }
    } else {
      toast.error('La URL de la imagen debe terminar en .jpeg, .jpg o .png');
    }
  };

  const handleIconRemove = async () => {
    try {
      await axios.put(`${apiRoutes.baseurl}${apiRoutes.updateUserInfo}`, { imgProfile: '' }, getAuthHeaders());
      setUserData({ ...userData, imgProfile: '' });
      toast.success('Imagen de perfil eliminada');
    } catch (error) {
      console.error('Error removing profile image:', error);
      toast.error('Error al eliminar la imagen de perfil');
    }
  };

  const formBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const buttonBg = useColorModeValue('blue.400', 'blue.500');
  const buttonHoverBg = useColorModeValue('blue.500', 'blue.600');
  const labelColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bgGradient="radial-gradient(circle at 80% 70%, rgba(75, 0, 130, 0.2), transparent 50%), radial-gradient(circle at 70% 70%, rgba(75, 0, 130, 0.2), transparent 50%)"
    >
      <Stack spacing={2} w={'full'} maxW={'md'}>
        <VisitGithub />
        <Stack
          spacing={3}
          w={'full'}
          bg={formBg}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          as="form"
          onSubmit={isEditingPassword ? handlePasswordSubmit : undefined}
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} color={textColor}>
              Editar Perfil de Usuario
            </Heading>
            <Logout />
          </Flex>
          <FormControl id="userName">
            <FormLabel color={labelColor}>Ícono de Usuario</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={userData.imgProfile}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="eliminar imagen"
                    icon={<SmallCloseIcon />}
                    onClick={handleIconRemove}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" onClick={onOpen}>Cambiar Ícono</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="firstName" isRequired>
            <FormLabel color={labelColor}>Nombre de Usuario</FormLabel>
            <Input
              placeholder="Nombre de Usuario"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={userData.firstName}
              onChange={handleInputChange}
              isReadOnly
              _readOnly={{ cursor: 'not-allowed' }}
              color={textColor}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel color={labelColor}>Correo Electrónico</FormLabel>
            <Input
              placeholder="tu-correo@ejemplo.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={userData.email}
              onChange={handleInputChange}
              isReadOnly
              _readOnly={{ cursor: 'not-allowed' }}
              color={textColor}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel color={labelColor}>Contraseña</FormLabel>
            <InputGroup>
              <Input
                placeholder="contraseña"
                _placeholder={{ color: 'gray.500' }}
                type={showPassword ? 'text' : 'password'}
                value={userData.password}
                onClick={userData.password === '*****' ? handlePasswordClick : undefined}
                onChange={handleInputChange}
                color={textColor}
              />
              {userData.password !== '*****' && (
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={handlePasswordToggle}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>
          {isEditingPassword && (
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500',
                }}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                bg={buttonBg}
                color={'white'}
                w="full"
                _hover={{
                  bg: buttonHoverBg,
                }}
                type="submit"
              >
                Enviar
              </Button>
            </Stack>
          )}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Ingresar URL de la Imagen</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>URL de la Imagen</FormLabel>
                  <Input
                    placeholder="https://i.imgur.com/QDP3W9s.jpeg"
                    value={iconUrl}
                    onChange={(e) => setIconUrl(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleIconChange}>
                  Cambiar
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <ToastContainer />
        </Stack>
      </Stack>
    </Flex>
  );
}