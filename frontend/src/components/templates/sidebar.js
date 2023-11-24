import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Button,
  MenuList,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react';
import {
  FiHome,
  FiBookOpen,
  FiShoppingCart,
  FiClock,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiSearch,
  FiX,
} from 'react-icons/fi';
import DgLogo from './dglogo';
import './css/sidebar.css'; // Importar el archivo CSS
import { Link, Outlet, useNavigate } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: React.ElementType;
  to?: string;
}

interface NavItemProps extends FlexProps {
  icon: React.ElementType;
  children: React.ReactNode;
  to?: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
  handleLogout: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const handleLogout = async () => {
  try {
    await axios.post('http://localhost:3001/api/logout', null, { withCredentials: true });
    window.location.reload();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

const LinkItems: LinkItemProps[] = [
  { name: 'Inicio', icon: FiHome, to: '/inicio' },
  { name: 'Tienda', icon: FiBookOpen, to: '/tienda' },
  { name: 'Carrito', icon: FiShoppingCart, to: '/carrito' },
  { name: 'Pedidos', icon: FiClock, to: '/pedidos' },
  { name: 'Configuración', icon: FiSettings, to: '/configuracion' },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleIconClick = () => {
        if (window.innerWidth <= 768) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <Box
            onMouseEnter={() => {
                setIsHovered(true);
                setIsExpanded(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                if (!isExpanded) {
                    setIsExpanded(false);
                }
            }}
            w={isExpanded || isHovered ? { base: 'full', md: 60 } : '60px'}
            pos="fixed"
            h="full"
            overflow="hidden"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            className={isExpanded ? 'sidebar-expanded' : ''}
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                {/* ... (otros códigos) */}
                <IconButton
                    display={{ base: 'flex', md: 'none' }}
                    fontSize="20px"
                    aria-label="Open menu"
                    icon={<FiMenu />}
                    onClick={handleIconClick}  // Ajusta aquí
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    icon={link.icon}
                    to={link.to}
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                    setIsExpanded={setIsExpanded}
                >
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

const NavItem = ({ icon, to, children, isHovered, setIsHovered, setIsExpanded, ...rest }: NavItemProps) => {
  return (
    <Box as="div" _focus={{ boxShadow: 'none' }}>
      <Flex
        onMouseEnter={() => {
          setIsHovered(true);
          setIsExpanded(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsExpanded(false);
        }}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
            className={icon === FiBell ? 'bell-icon' : ''}
          />
        )}
        {to ? (
          <Link to={to} style={{ textDecoration: 'none' }}>
            <Box
              ml={2}
              visibility={isHovered ? 'visible' : 'hidden'}
              transition="visibility 0.3s"
            >
              {children}
            </Box>
          </Link>
        ) : (
          <>{children}</>
        )}
      </Flex>
    </Box>
  );
};



const MobileNav = ({ onOpen, handleLogout, ...rest }: MobileProps) => {
    const [username, setUsername] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const { isOpen, onToggle } = useDisclosure();

    useEffect(() => {
        const getUsername = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/user/getUsername', { withCredentials: true });
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error al obtener el nombre de usuario:', error);
            }
        };

        if (!document.cookie.includes('connect.sid')) {
            getUsername();
        } else {
            axios
                .get('http://localhost:3001/api/user/getUsername', { withCredentials: true })
                .then((response) => {
                    setUsername(response.data.username);
                })
                .catch((error) => {
                    console.error('Error al obtener el nombre de usuario:', error);
                });
        }
    }, []);

    const clearSearch = () => {
        setSearchText('');
    };

    const handleMenuClick = () => {
        onOpen();
    };

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={handleMenuClick}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            </Text>

            <Flex alignItems="center">
                {/* Lupa en dispositivos móviles */}
                <Box
                    display={{ base: 'flex', md: 'none' }}
                    onClick={() => {
                        onToggle();
                        setIsSearchActive(!isSearchActive);
                    }}
                    className={`search-button-mobile ${isSearchActive ? 'active' : ''}`}
                >
                    <Icon as={FiSearch} fontSize="20" color="gray.500" />
                </Box>

                <InputGroup
                    display={{ base: isSearchActive ? 'flex' : 'none', md: 'flex' }}
                    mr="250"
                    borderRadius="full"
                    bg={useColorModeValue('gray.100', 'gray.700')}
                    boxShadow="md"
                    alignItems="center"
                    width={{ base: '100%', md: '500px' }}
                    px="4"
                >
                    {searchText !== '' && (
                        <InputLeftElement h="100%" lineHeight="1">
                            <IconButton
                                aria-label="Clear search"
                                icon={<FiX className="clear-search-button" />}
                                onClick={clearSearch}
                                size="sm"
                                borderRadius="full"
                                _hover={{
                                    bg: 'transparent',
                                }}
                            />
                        </InputLeftElement>
                    )}
                    <Input
                        variant="unstyled"
                        placeholder="Ingresá descripción o código del producto.."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        py="3"
                        lineHeight="1"
                    />
                    <InputRightElement h="100%" lineHeight="1">
                        <IconButton
                            aria-label="Search"
                            icon={<FiSearch className="search-button" />}
                            color="black.500"
                            borderRadius="full"
                        />
                        <Box className="separator" />
                    </InputRightElement>
                </InputGroup>

                <HStack spacing={{ base: '0', md: '6' }}>
                    <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell className="bell-icon" />} />
                    <Flex alignItems={'center'}>
                        <a onClick={onToggle}>
                            <HStack position="relative">
                                <Box
                                    position="absolute"
                                    left="-5px"
                                    top="-5px"
                                    right="-5px"
                                    bottom="-5px"
                                    borderRadius="full"
                                    boxShadow="0px 0px 5px rgba(0, 255, 255, 0.5)"
                                />
                                <Box borderLeft="1px" borderColor={useColorModeValue('gray.200', 'gray.700')} height="24px" mx="4" />
                                <Icon as={FiUser} fontSize="xl" color="gray.600" />
                                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                                    <Text fontSize="sm">{username}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        RANGO ASIGNADO
                                    </Text>
                                </VStack>
                                <HStack position="relative">
                                    <Box
                                        position="absolute"
                                        left="2px"
                                        top="-5px"
                                        right="2px"
                                        bottom="-5px"
                                        borderRadius="full"
                                        boxShadow="0px 0px 5px rgba(0, 255, 255, 0.5)"
                                    />
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rounded="full"
                                            variant="link"
                                            cursor="pointer"
                                            position="relative"
                                            zIndex="1"
                                            _hover={{
                                                boxShadow: '1px 1px 20px rgba(0, 255, 255, 0.5)',
                                                bg: useColorModeValue('gray.100', 'gray.700'),
                                            }}
                                            paddingLeft="3"
                                            paddingRight="1"
                                        >
                                            <FiChevronDown />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>Perfil</MenuItem>
                                            <MenuItem>Configuración</MenuItem>
                                            <MenuItem>Estado de cuenta</MenuItem>
                                            <MenuDivider />
                                            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </HStack>
                                <Box borderLeft="1px" borderColor={useColorModeValue('gray.200', 'gray.700')} height="24px" mx="4" />
                            </HStack>
                        </a>
                    </Flex>
                </HStack>
            </Flex>
        </Flex>
    );
};


const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} handleLogout={handleLogout} />
      <Flex ml={{ base: 0, md: 60 }} p="4" align="center" justify="center">
        <Outlet />
      </Flex>
    </Box>
  );
};

export default SidebarWithHeader;
