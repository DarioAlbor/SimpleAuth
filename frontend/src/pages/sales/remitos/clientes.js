import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const RemitosClientes = () => {
  const [clienteData, setClienteData] = useState({
    nombre: '',
    razonSocial: '',
    numeroCuenta: '',
    direccionEntrega: '',
  });

  const [errorNombre, setErrorNombre] = useState('');
  const [clientes, setClientes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpiar el mensaje de error cuando el usuario edita el campo de nombre
    if (name === 'nombre') {
      setErrorNombre('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el nombre del cliente está presente
    if (!clienteData.nombre.trim()) {
      setErrorNombre('El nombre del cliente es obligatorio.');
      return;
    }

    try {
      // Realizar la solicitud POST al servidor
      const response = await axios.post('http://45.162.169.217:3001/api/remitos/clientes/guardar', clienteData);

      // Manejar la respuesta del servidor si es necesario
      console.log('Respuesta del servidor:', response.data);

      // Actualizar la lista de clientes después de agregar uno nuevo
      cargarClientes();
    } catch (error) {
      // Manejar errores en caso de que la solicitud falle
      console.error('Error al enviar datos del cliente:', error);
    }

    // Luego puedes restablecer el formulario si es necesario
    setClienteData({
      nombre: '',
      razonSocial: '',
      numeroCuenta: '',
      direccionEntrega: '',
    });
  };

  const cargarClientes = async () => {
    try {
      // Realizar la solicitud GET al servidor para obtener todos los clientes
      const response = await axios.get('http://45.162.169.217:3001/api/remitos/clientes/traer');

      // Actualizar el estado de los clientes con los datos obtenidos
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  useEffect(() => {
    // Cargar la lista de clientes al montar el componente
    cargarClientes();
  }, []); // El segundo parámetro vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <Container maxW="container.lg" mt={8}>
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold">Agregar Nuevo Cliente</Text>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>
            Nombre del Cliente<span style={{ color: 'red' }}>*</span>
          </FormLabel>
          <Input
            type="text"
            name="nombre"
            value={clienteData.nombre}
            onChange={handleChange}
            isRequired
          />
          <span style={{ color: 'red' }}>{errorNombre}</span>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Razon Social</FormLabel>
          <Input
            type="text"
            name="razonSocial"
            value={clienteData.razonSocial}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Nº Cuenta</FormLabel>
          <Input
            type="text"
            name="numeroCuenta"
            value={clienteData.numeroCuenta}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Dirección de Entrega</FormLabel>
          <Textarea
            name="direccionEntrega"
            value={clienteData.direccionEntrega}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Agregar Cliente
        </Button>
      </form>

      {/* Tabla para mostrar los clientes */}
      <Box mt={8}>
        <Text fontSize="xl" fontWeight="bold">Lista de Clientes</Text>
        <Table mt={4} variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Razón Social</Th>
              <Th>Nº Cuenta</Th>
              <Th>Dirección de Entrega</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clientes.map((cliente) => (
              <Tr key={cliente.id}>
                <Td>{cliente.nombre}</Td>
                <Td>{cliente.razonSocial}</Td>
                <Td>{cliente.numeroCuenta}</Td>
                <Td>{cliente.direccionEntrega}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default RemitosClientes;
