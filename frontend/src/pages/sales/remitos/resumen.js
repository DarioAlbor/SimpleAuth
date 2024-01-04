import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const ResumenRemitos = () => {
  const [remitos, setRemitos] = useState([]);
  const [vendedorUsername, setVendedorUsername] = useState('');

  const cargarVendedorUsername = async () => {
    try {
      // Realizar la solicitud GET al servidor para obtener el nombre de usuario del vendedor
      const response = await axios.get('http://localhost:3001/api/user/getUsername', { withCredentials: true })

      // Actualizar el estado con el nombre de usuario del vendedor
      setVendedorUsername(response.data.username);
    } catch (error) {
      console.error('Error al obtener el nombre de usuario del vendedor:', error);
    }
  };

  const cargarRemitos = async () => {
    try {
      // Verificar si se ha cargado el nombre de usuario del vendedor
      if (!vendedorUsername) {
        console.warn('Nombre de usuario del vendedor no disponible.');
        return;
      }

      // Realizar la solicitud GET al servidor para obtener todos los remitos
      const response = await axios.get('http://localhost:3001/api/remitos/resumen', { withCredentials: true })

      // Filtrar los remitos por el vendedor actual
      const remitosDelVendedor = response.data.filter(remito => remito.vendedor === vendedorUsername);

      // Actualizar el estado de los remitos filtrados
      setRemitos(remitosDelVendedor);
    } catch (error) {
      console.error(`Error al obtener remitos del vendedor ${vendedorUsername}:`, error);
    }
  };

  useEffect(() => {
    // Cargar el nombre de usuario del vendedor al montar el componente
    cargarVendedorUsername();
  }, []); // El segundo parámetro vacío asegura que se ejecute solo una vez al montar el componente

  useEffect(() => {
    // Cargar y filtrar la lista de remitos del vendedor al obtener el nombre de usuario
    cargarRemitos();
  }, [vendedorUsername]); // El segundo parámetro asegura que se actualice cuando cambie el vendedorUsername

  return (
    <Container maxW="container.lg" mt={8}>
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Resumen de Remitos - Vendedor {vendedorUsername}</Text>
      </Box>
  
      {/* Tabla para mostrar los remitos del vendedor */}
      <Table mt={4} variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Número de Remito</Th>
            <Th>Unidades</Th>
            <Th>Monto Total</Th>
            <Th>Cliente</Th>
            {/* Agrega más encabezados según tus necesidades */}
          </Tr>
        </Thead>
        <Tbody>
          {remitos.map((remito) => (
            <Tr key={remito.id}>
              <Td>{remito.nroRemito}</Td> {/* Cambio aquí: Mostrar nroRemito en lugar de id */}
              <Td>{remito.unidades}</Td>
              <Td>${remito.total}</Td>
              <Td>{remito.cliente}</Td>
              {/* Agrega más celdas según tus necesidades */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default ResumenRemitos;
