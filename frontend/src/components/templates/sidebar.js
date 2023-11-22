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
    MenuList,
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
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import DgLogo from './dglogo';

import { Link, Outlet, useNavigate } from 'react-router-dom';

interface LinkItemProps {
    name: string;
    icon: IconType;
    to?: string;
}

interface NavItemProps extends FlexProps {
    icon: IconType;
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
        window.location.reload(); // Recarga la página después de cerrar sesión
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};

const LinkItems: Array<LinkItemProps> = [
    { name: 'Inicio', icon: FiHome, to: '/inicio' },
    {
        name: 'Tienda',
        icon: FiBookOpen,
        to: '/tienda',
    },
    { name: 'Carrito', icon: FiShoppingCart, to: '/carrito' },
    { name: 'Pedidos', icon: FiClock, to: '/pedidos' },
    { name: 'Configuración', icon: FiSettings, to: '/configuracion' },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const navigate = useNavigate();

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <DgLogo size="60px" centered={false} right="0px" top="10px" right="150px" />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} to={link.to}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
    return (
        <Box as="div" _focus={{ boxShadow: 'none' }}>
            <Flex
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
                    />
                )}
                {to ? (
                    <Link to={to} style={{ textDecoration: 'none' }}>
                        {children}
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
            axios.get('http://localhost:3001/api/user/getUsername', { withCredentials: true })
                .then((response) => {
                    setUsername(response.data.username);
                })
                .catch((error) => {
                    console.error('Error al obtener el nombre de usuario:', error);
                });
        }
    }, []);

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
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                <DgLogo size="55px" centered={false} right="0px" top="10px" right="230px" />
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={'RUTA DE LA FOTO (A IMPLEMENTAR)'}
                                />
                                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                                    <Text fontSize="sm">{username}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        RANGO ASIGNADO
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Perfil</MenuItem>
                            <MenuItem>Configuración</MenuItem>
                            <MenuItem>Estado de cuenta</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
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
