import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Text, Table, Divider, Tbody, Tr, Td, Th, Thead, IconButton, Icon } from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';

const ResumenRemitos = () => {
  const [remitos, setRemitos] = useState([]);
  const [vendedorUsername, setVendedorUsername] = useState('');
  const [remitosDelVendedor, setRemitosDelVendedor] = useState([]); // Agregamos el estado de remitosDelVendedor

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

      // Utilizar un conjunto para almacenar los números de remito únicos
      const remitosUnicos = new Set();

      // Filtrar remitos duplicados y almacenar los números de remito únicos
      const remitosFiltrados = remitosDelVendedor.filter(remito => {
        if (!remitosUnicos.has(remito.nroRemito)) {
          remitosUnicos.add(remito.nroRemito);
          return true;
        }
        return false;
      });

      // Actualizar el estado solo si ha cambiado
      if (JSON.stringify(remitosFiltrados) !== JSON.stringify(remitos)) {
        setRemitos(remitosFiltrados);
        setRemitosDelVendedor(remitosDelVendedor); // Actualizamos el estado de remitosDelVendedor
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

  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
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
            <Th></Th> {/* Celda adicional para el icono */}
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
                    onClick={() => handleRowClick(index)}
                    variant="ghost"
                    colorScheme="teal"
                  />
                </Td>
              </Tr>
              {expandedRow === index && (
                <Tr>
                  <Td colSpan={3}>
                    <Box p={4}>
                      <Text fontSize="lg" fontWeight="bold">Detalles del Remito</Text>
                      <Table variant="striped" colorScheme="teal">
                        <Thead>
                          <Tr>
                            <Th>Unidades</Th>
                            <Th>Item</Th>
                            <Th>Precio</Th>
                            {/* Agrega más encabezados según tus necesidades */}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {/* Mostrar detalles específicos de cada remito */}
                          {remitosDelVendedor
                            .filter(r => r.nroRemito === remito.nroRemito)
                            .map((renglon, idx) => (
                              <Tr key={idx}>
                                <Td>{renglon.unidades}</Td>
                                <Td>{renglon.item}</Td>
                                <Td>{parseFloat(renglon.total).toFixed(2)}</Td>
                                {/* Agrega más celdas según tus necesidades */}
                              </Tr>
                            ))}
                        </Tbody>
                      </Table>
                      <Divider mt={4} mb={2} />
                      {/* Agregar la suma total y cantidad total para el remito seleccionado */}
                      <Box>
                        <Text fontSize="sm" fontWeight="bold">
                          Importe Total: {parseFloat(remito.total).toFixed(2)}
                        </Text>
                        <Text fontSize="sm" fontWeight="bold">
                          Cantidades Totales: {parseInt(remito.unidades)}
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