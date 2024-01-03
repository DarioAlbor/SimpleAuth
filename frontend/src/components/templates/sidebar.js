    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import Search from './assets/search';
    import UploadFile from './assets/uploadfile';
    import ButtonDeveloper from './assets/buttons/ButtonDeveloper';
    import ButtonDirector from './assets/buttons/ButtonDirector';
    import ButtonDesigner from './assets/buttons/ButtonDesigner';
    import ButtonPanel from './assets/buttons/ButtonPanel';  // Importa el nuevo botón
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
    useColorMode,
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
    FiUploadCloud,
    FiBell,
    FiChevronDown,
    FiUser,
    FiSearch,
    FiCode,
    FiX,
    } from 'react-icons/fi';
    import { TfiPencilAlt } from "react-icons/tfi";
    import { RiAdminFill } from "react-icons/ri";
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
    handleMenuIconClick: () => void;

    }

    interface SidebarProps extends BoxProps {
    onClose: () => void;
    }

    const handleLogout = async () => {
        try {
            await axios.post('http://drogueriagarzon.com:3001/api/logout', null, { withCredentials: true });
            window.location.reload();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
        const [isHovered, setIsHovered] = React.useState(false);
        const [isExpanded, setIsExpanded] = React.useState(false);
        const [role, setRole] = useState(null);
        const { colorMode } = useColorMode();
        const sidebarBgColor = useColorModeValue('white', 'gray.900');
        const sidebarBorderColor = useColorModeValue('gray.200', 'gray.700');
        const navItemHoverBgColor = useColorModeValue('cyan.400', 'cyan.600');
        const navItemColor = useColorModeValue('gray', 'gray.600');
        const navItemBgColor = useColorModeValue('transparent', 'transparent');
        const navItemTextColor = useColorModeValue('gray.700', 'white');
      
        const handleMouseEnter = () => {
          setIsHovered(true);
          setIsExpanded(true);
        };
      
        const handleMouseLeave = () => {
          setIsHovered(false);
          if (!isExpanded) {
            setIsExpanded(false);
          }
        };
      
        useEffect(() => {
          const collapseMenu = () => {
            if (!isHovered && isExpanded) {
              setIsExpanded(false);
            }
          };
      
          window.addEventListener('mousemove', collapseMenu);
      
          return () => {
            window.removeEventListener('mousemove', collapseMenu);
          };
        }, [isHovered, isExpanded]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get('http://drogueriagarzon.com:3001/api/user/getRole', { withCredentials: true });
              setRole(response.data.role);
            } catch (error) {
              console.error('Error al obtener el rol del usuario:', error);
            }
          };
      
          fetchData();
        }, []);
      
        const LinkItems: LinkItemProps[] = [
          { name: 'Inicio', icon: FiHome, to: '/inicio' },
          { name: 'Tienda', icon: FiShoppingCart, to: '/tienda' },
          { name: 'Via Salud', icon: FiBookOpen, to: '/viasalud' },
          { name: 'Pedidos', icon: FiClock, to: '/pedidos' },
        ];
      
        return (
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            w={isExpanded || isHovered ? { base: 'full', md: 60 } : '60px'}
            pos="fixed"
            h="full"
            overflow="hidden"
            bg={sidebarBgColor}
            borderRight="1px"
            borderRightColor={sidebarBorderColor}
            className={`sidebar ${isExpanded ? 'sidebar-expanded' : ''}`}
            zIndex={10}
            {...rest}
          >
            <Flex h="150" alignItems="center" mx="8" justifyContent="space-between">
              {/* Contenido superior del menú lateral (próximo a dglogo) */}
            </Flex>
            {LinkItems.map((link) => (
              <NavItem
                key={link.name}
                icon={link.icon}
                to={link.to}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
                setIsExpanded={setIsExpanded}
                navItemHoverBgColor={navItemHoverBgColor}
                navItemColor={navItemColor}
                navItemBgColor={navItemBgColor}
                navItemTextColor={navItemTextColor}
              >
                {link.name}
              </NavItem>
            ))}
            {role && <ButtonPanel isHovered={isHovered} setIsHovered={setIsHovered} setIsExpanded={setIsExpanded} />}
          </Box>
        );
      };
      
      const NavItem = ({
        icon,
        to,
        children,
        isHovered,
        isExpanded,
        setIsHovered,
        setIsExpanded,
        navItemHoverBgColor,
        navItemColor,
        navItemBgColor,
        navItemTextColor,
        ...rest
      }: NavItemProps) => {
        const { colorMode } = useColorMode();
      
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
              p="5"
              mx="1"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: navItemHoverBgColor,
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
                  className={`icon ${icon === FiBell ? 'bell-icon' : ''}`}
                  style={{ color: colorMode === 'light' ? navItemColor : 'white' }}
                />
              )}
              {to ? (
                <Link to={to} style={{ textDecoration: 'none' }}>
                  <Box
                    ml={2}
                    visibility={isHovered ? 'visible' : 'hidden'}
                    transition="visibility 0.1s"
                    className={`nav-item ${isExpanded ? 'sidebar-expanded' : 'nav-item-minimized'}`}
                    bg={navItemBgColor}
                    color={navItemTextColor}
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
      
      const MobileNav = ({ onOpen, handleLogout, handleMenuIconClick, ...rest }: MobileProps) => {
        const [username, setUsername] = useState(null);
        const [role, setRole] = useState(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get('http://drogueriagarzon.com:3001/api/user/getUsername', { withCredentials: true });
              setUsername(response.data.username);
            } catch (error) {
              console.error('Error al obtener el nombre de usuario:', error);
            }
      
            try {
              const response = await axios.get('http://drogueriagarzon.com:3001/api/user/getRole', { withCredentials: true });
              setRole(response.data.role);
            } catch (error) {
              console.error('Error al obtener el rol del usuario:', error);
            }
          };
      
          if (!document.cookie.includes('connect.sid')) {
            fetchData();
          } else {
            axios
              .all([
                axios.get('http://drogueriagarzon.com:3001/api/user/getUsername', { withCredentials: true }),
                axios.get('http://drogueriagarzon.com:3001/api/user/getRole', { withCredentials: true }),
              ])
              .then((responses) => {
                setUsername(responses[0].data.username);
                setRole(responses[1].data.role);
              })
              .catch((error) => {
                console.error('Error al obtener el nombre de usuario y el rol del usuario:', error);
              });
          }
        }, []);
      
        return (
          <Flex
            ml={{ base: 0, md: 0 }}
            px={{ base: 0, md: 150 }}
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
              onClick={() => {
                onOpen();
                handleMenuIconClick();
              }}
              variant="outline"
              aria-label="open menu"
              icon={<FiMenu />}
            />
      
            <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold"></Text>
      
            <Flex alignItems="center">
              <UploadFile />
              <Search />
              <Box className="separator" />
              <HStack spacing={{ base: '0', md: '5' }}>
                <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell className="bell-icon" />} />
                <Flex alignItems={'center'}>
                  {/* Modificación aquí */}
                  <a
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar propagación del clic al elemento padre
                      onOpen();
                    }}
                  >
                    <HStack position="relative" onClick={(e) => e.stopPropagation()}>
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
                      <Icon as={FiUser} fontSize="xl" color={useColorModeValue('blue.600', 'blue.600')} />
                      <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                        <Text fontSize="sm">{username}</Text>
                        <Text fontSize="xs" color={useColorModeValue('gray.600', 'white.600')}>
                          {role}
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
                            paddingLeft="3"
                            paddingRight="1"
                            onClick={(e) => {
                              e.stopPropagation(); // Evitar propagación del clic al elemento padre
                            }}
                          >
                            <FiChevronDown />
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Perfil</MenuItem>
                            <MenuItem>
                              <Link to="/user">Configuración</Link>
                            </MenuItem>
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
            <Box minH="0vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
                <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
                    <DrawerContent>
                        {/* Aquí no deberías renderizar MobileNav */}
                        <SidebarContent onClose={onClose} />
                    </DrawerContent>
                </Drawer>
                {/* Renderiza MobileNav fuera del Drawer */}
                <MobileNav onOpen={onOpen} handleLogout={handleLogout} />
                <Flex ml={{ base: 0, md: 0 }} p="0" align="center" justify="center">
                    <Outlet />
                </Flex>
            </Box>
        );
    };
    
    export default SidebarWithHeader;