// ./components/Catalogo.js
import React, { useState } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    useMediaQuery,
    Input,
    Button,
    Flex,
    Tooltip,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Switch,
} from '@chakra-ui/react';
import { AiFillExclamationCircle, AiFillCheckCircle, AiFillWarning } from 'react-icons/ai'; // Importa iconos
import { FiFilter } from 'react-icons/fi'; // Iconos FIs
import ReactTooltip from 'react-tooltip'; // Importa react-tooltip
import './css/Catalogo.css'; // Importa los estilos CSS

const Catalogo = () => {
    const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
    const maxCantidad = 100;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = () => {
        // No cerrar el menú al hacer clic en un elemento del menú
    };

    const initialData = [
        { descripcion: 'Producto 1', laboratorio: 'Lab A', stock: 10, pvp: 20, precioConDesc: 18, minOfer: 2 },
        { descripcion: 'Producto 2', laboratorio: 'Lab B', stock: 3, pvp: 25, precioConDesc: 22, minOfer: 1 },
        { descripcion: 'Producto 3', laboratorio: 'Lab C', stock: 8, pvp: 18, precioConDesc: 16, minOfer: 3 },
        // Agrega más datos según sea necesario
    ];

    const [data, setData] = useState(initialData.map((item) => ({ ...item, cantidad: 1, showWarning: false })));
    const [alertIndex, setAlertIndex] = useState(null);

    const getStockColor = (stock) => {
        if (stock < 5) {
            return 'red.500'; // Rojo si el stock es menor a 5
        } else if (stock < 10) {
            return 'yellow.500'; // Amarillo si el stock es menor a 10
        } else {
            return 'green.500'; // Verde si el stock es mayor o igual a 10
        }
    };

    const getStockMessage = (stock) => {
        if (stock < 5) {
            return 'Stock Crítico'; // Mensaje si el stock es menor a 5
        } else if (stock < 10) {
            return 'Poco Stock'; // Mensaje si el stock es menor a 10
        } else {
            return 'Stock Disponible'; // Mensaje si el stock es mayor o igual a 10
        }
    };

    const getStockIcon = (stock) => {
        if (stock < 5) {
            return <AiFillExclamationCircle fontSize="lg" />;
        } else if (stock < 10) {
            return <AiFillWarning fontSize="lg" />;
        } else {
            return <AiFillCheckCircle fontSize="lg" />;
        }
    };

    const handleCantidadChange = (index, value) => {
        const newData = [...data];
        newData[index].cantidad = value;
        newData[index].showWarning = value > maxCantidad;
        setAlertIndex(newData[index].showWarning ? index : null);
        setData(newData);
    };

    return (
        <Box className={`box ${isLargerThan600 ? 'larger-than-600' : ''}`}>
            <Flex mb="4" justifyContent="flex-end">
                <Menu isOpen={isMenuOpen}>
                    <MenuButton
                        as={Button}
                        colorScheme="teal"
                        leftIcon={<FiFilter />}
                        onClick={handleMenuToggle}
                    >
                        Filtrar
                    </MenuButton>
                    <MenuList
                        opacity={isMenuOpen ? '0.7' : '1'}
                        bg={isMenuOpen ? 'gray.800' : 'transparent'}
                    >
                        <MenuItem>FILTROS DISPONIBLES</MenuItem>
                        <MenuDivider />
                        <MenuItem>
                            <Menu>
                                <MenuButton as={Button} rightIcon="{ICONO}" onClick={() => { }}>
                                    Sector
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Todos</MenuItem>
                                    <MenuItem>Perfumeria</MenuItem>
                                    <MenuItem>Medicinal</MenuItem>
                                    <MenuItem>No medicinal</MenuItem>
                                </MenuList>
                            </Menu>
                        </MenuItem>
                        <MenuItem>
                            <Menu>
                                <MenuButton as={Button} rightIcon="{ICONO}" onClick={() => { }}>
                                    Laboratorio
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Todos</MenuItem>
                                    <MenuItem>Lab 1</MenuItem>
                                    <MenuItem>Lab 2</MenuItem>
                                </MenuList>
                            </Menu>
                        </MenuItem>
                        <MenuItem>
                            <Menu>
                                <MenuButton as={Button} rightIcon="{ICONO}" onClick={() => { }}>
                                    Categoria
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Todos</MenuItem>
                                    <MenuItem>Opcion 1</MenuItem>
                                    <MenuItem>Opcion 2</MenuItem>
                                </MenuList>
                            </Menu>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem>
                            <Flex>
                                <Box>Ofertas</Box>
                                <Switch />
                            </Flex>
                        </MenuItem>
                        <MenuItem>
                            <Flex>
                                <Box>Productos de licitacion</Box>
                                <Switch />
                            </Flex>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Table variant="striped" colorScheme="teal" size="sm" className="table">
                <TableCaption
                    placement="top"
                    fontWeight="bold"
                    fontSize="lg"
                    color="teal.500"
                    textTransform="uppercase"
                    textAlign="center"
                    pb="2"
                >
                    CATALOGO:
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>DESCRIPCION</Th>
                        <Th>LABORATORIO</Th>
                        <Th>STOCK</Th>
                        <Th>PVP</Th>
                        <Th>PRECIO C/ DESC.</Th>
                        <Th>MIN. OFER</Th>
                        <Th>CANT.</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((producto, index) => (
                        <Tr key={index}>
                            <Td>{producto.descripcion}</Td>
                            <Td>{producto.laboratorio}</Td>
                            <Td>
                                <Tooltip label={getStockMessage(producto.stock)} placement="top" hasArrow>
                                    <Box as="span" color={getStockColor(producto.stock)} fontSize="lg">
                                        {getStockIcon(producto.stock)}
                                    </Box>
                                </Tooltip>
                            </Td>
                            <Td>{producto.pvp}</Td>
                            <Td>{producto.precioConDesc}</Td>
                            <Td>{producto.minOfer}</Td>
                            <Td>
                                <Input
                                    type="number"
                                    value={producto.cantidad}
                                    onChange={(e) => handleCantidadChange(index, e.target.value)}
                                    w="60px" // Ajusta el ancho de la caja de entrada
                                />
                                {alertIndex === index && (
                                    <div className="alert-box">
                                        <div className="alert alert-danger">
                                            <div className="alert-icon alert-warning">!</div>
                                            <div className="alert-text">La cantidad máxima permitida es 100 por producto.</div>
                                        </div>
                                    </div>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default Catalogo;
