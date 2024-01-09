import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Text, Table, Divider, Tbody, Tr, Td, Th, Thead, IconButton, Icon } from '@chakra-ui/react';
import { FaAngleDown, FaEdit, FaTrash } from 'react-icons/fa';

const ResumenRemitos = () => {
  const [remitos, setRemitos] = useState([]);
  const [vendedorUsername, setVendedorUsername] = useState('');
  const [remitosDelVendedor, setRemitosDelVendedor] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [detalleRemito, setDetalleRemito] = useState({});

  const cargarVendedorUsername = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/user/getUsername', { withCredentials: true });
      setVendedorUsername(response.data.username);
    } catch (error) {
      console.error('Error al obtener el nombre de usuario del vendedor:', error);
    }
  };

  const cargarRemitos = async () => {
    try {
      if (!vendedorUsername) {
        console.warn('Nombre de usuario del vendedor no disponible.');
        return;
      }

      const response = await axios.get('http://localhost:3001/api/remitos/resumen', { withCredentials: true });
      const remitosDelVendedor = response.data.filter(remito => remito.vendedor === vendedorUsername);

      const remitosUnicos = new Set();
      const remitosFiltrados = remitosDelVendedor.filter(remito => {
        if (!remitosUnicos.has(remito.nroRemito)) {
          remitosUnicos.add(remito.nroRemito);
          return true;
        }
        return false;
      });

      if (JSON.stringify(remitosFiltrados) !== JSON.stringify(remitos)) {
        setRemitos(remitosFiltrados);
        setRemitosDelVendedor(remitosDelVendedor);
      }
    } catch (error) {
      console.error(`Error al obtener remitos del vendedor ${vendedorUsername}:`, error);
    }
  };

  useEffect(() => {
    cargarVendedorUsername();
  }, []);

  useEffect(() => {
    cargarRemitos();
  }, [vendedorUsername]);

  const handleRowClick = (index, remito) => {
    setExpandedRow(expandedRow === index ? null : index);
    setDetalleRemito(remito);
  };

  const handleEditRemito = (remitoId) => {
    console.log('Editar Remito con ID:', remitoId);
  };

  const handleDeleteRemito = (remitoId) => {
    console.log('Borrar Remito con ID:', remitoId);
  };

  return (
    <Container maxW="container.lg" mt={8}>
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Resumen de Remitos - Vendedor {vendedorUsername}</Text>
      </Box>

      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Número de Remito</Th>
            <Th>Cliente</Th>
            <Th></Th> 
          </Tr>
        </Thead>
        <Tbody>
          {remitos.map((remito, index) => (
            <React.Fragment key={remito.id}>
              <Tr>
                <Td>{remito.nroRemito}</Td>
                <Td>{remito.cliente}</Td>
                <Td>
                  <IconButton
                    aria-label="Expandir Detalles"
                    icon={<Icon as={FaAngleDown} />}
                    onClick={() => handleRowClick(index, remito)}
                    variant="ghost"
                    colorScheme="teal"
                  />
                </Td>
              </Tr>
              {expandedRow === index && (
                <Tr>
                  <Td colSpan={4}>
                    <Box p={4}>
                      <Text fontSize="lg" fontWeight="bold">Detalles del Remito</Text>
                      <Table variant="striped" colorScheme="teal">
                        <Thead>
                          <Tr>
                            <Th>Unidades</Th>
                            <Th>Item</Th>
                            <Th>Precio</Th>
                            <Th>Acción</Th> 
                          </Tr>
                        </Thead>
                        <Tbody>
                          {remitosDelVendedor
                            .filter(r => r.nroRemito === detalleRemito.nroRemito)
                            .map((renglon, idx) => (
                              <Tr key={idx}>
                                <Td>{renglon.unidades}</Td>
                                <Td>{renglon.item}</Td>
                                <Td>{parseFloat(renglon.total).toFixed(2)}</Td>
                                <Td>
                                  <IconButton
                                    aria-label="Editar Renglón"
                                    icon={<Icon as={FaEdit} />}
                                    onClick={() => handleEditRemito(renglon.id)}
                                    variant="ghost"
                                    colorScheme="teal"
                                  />
                                  <IconButton
                                    aria-label="Borrar Renglón"
                                    icon={<Icon as={FaTrash} />}
                                    onClick={() => handleDeleteRemito(renglon.id)}
                                    variant="ghost"
                                    colorScheme="red"
                                  />
                                </Td>
                              </Tr>
                            ))}
                        </Tbody>
                      </Table>
                      <Divider mt={4} mb={2} />
                      <Box>
                        <Text fontSize="sm" fontWeight="bold">
                          Importe Total: {remitosDelVendedor
                            .filter(r => r.nroRemito === detalleRemito.nroRemito)
                            .reduce((total, detalle) => total + parseFloat(detalle.total), 0).toFixed(2)}
                        </Text>
                        <Text fontSize="sm" fontWeight="bold">
                          Cantidades Totales: {remitosDelVendedor
                            .filter(r => r.nroRemito === detalleRemito.nroRemito)
                            .reduce((total, detalle) => total + parseInt(detalle.unidades), 0)}
                        </Text>
                      </Box>
                    </Box>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default ResumenRemitos;
