// RemitosClientes.js

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
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';

const RemitosClientes = () => {
  const [clienteData, setClienteData] = useState({
    nombre: '',
    razonSocial: '',
    numeroCuenta: '',
    direccionEntrega: '',
    horario: '',
  });

  const [errorNombre, setErrorNombre] = useState('');
  const [clientes, setClientes] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'nombre') {
      setErrorNombre('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clienteData.nombre.trim()) {
      setErrorNombre('El nombre del cliente es obligatorio.');
      return;
    }

    try {
      const response = await axios.post('http://portal.drogueriagarzon.com:3001/api/remitos/clientes/guardar', clienteData);
      console.log('Respuesta del servidor:', response.data);
      cargarClientes();
    } catch (error) {
      console.error('Error al enviar datos del cliente:', error);
    }

    setClienteData({
      nombre: '',
      razonSocial: '',
      numeroCuenta: '',
      direccionEntrega: '',
      horario: '',
    });
  };

  const cargarClientes = async () => {
    try {
      const response = await axios.get('http://portal.drogueriagarzon.com:3001/api/remitos/clientes/traer');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const handleEditCliente = (clienteId) => {
    setEditMode(clienteId);
    setEditedData(clientes.find((cliente) => cliente.id === clienteId));
  };

  const handleConfirmEdit = async (clienteId) => {
    try {
      const response = await axios.put(`http://portal.drogueriagarzon.com:3001/api/remitos/clientes/editar/${clienteId}`, editedData);
      console.log('Respuesta del servidor al confirmar edición:', response.data);
      setEditMode(null);
      cargarClientes();
    } catch (error) {
      console.error('Error al confirmar edición:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedData({});
  };

  const handleDeleteCliente = async (clienteId) => {
    try {
      const response = await axios.delete(`http://portal.drogueriagarzon.com:3001/api/remitos/clientes/eliminar/${clienteId}`);
      console.log('Respuesta del servidor al eliminar cliente:', response.data);
      cargarClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

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
        <FormControl mb={4}>
          <FormLabel>Horario</FormLabel>
          <Input
            type="text"
            name="horario"
            value={clienteData.horario}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Agregar Cliente
        </Button>
      </form>

      <Box mt={8}>
        <Text fontSize="xl" fontWeight="bold">
          Lista de Clientes
        </Text>
        <Table mt={4} variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Razón Social</Th>
              <Th>Nº Cuenta</Th>
              <Th>Dirección de Entrega</Th>
              <Th>Horario</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clientes.map((cliente) => (
              <Tr key={cliente.id}>
                <Td>
                  {editMode === cliente.id ? (
                    <Input
                      type="text"
                      name="nombre"
                      value={editedData.nombre}
                      onChange={(e) => setEditedData({ ...editedData, nombre: e.target.value })}
                    />
                  ) : (
                    cliente.nombre
                  )}
                </Td>
                <Td>
                  {editMode === cliente.id ? (
                    <Input
                      type="text"
                      name="razonSocial"
                      value={editedData.razonSocial}
                      onChange={(e) => setEditedData({ ...editedData, razonSocial: e.target.value })}
                    />
                  ) : (
                    cliente.razonSocial
                  )}
                </Td>
                <Td>
                  {editMode === cliente.id ? (
                    <Input
                      type="text"
                      name="numeroCuenta"
                      value={editedData.numeroCuenta}
                      onChange={(e) => setEditedData({ ...editedData, numeroCuenta: e.target.value })}
                    />
                  ) : (
                    cliente.numeroCuenta
                  )}
                </Td>
                <Td>
                  {editMode === cliente.id ? (
                    <Textarea
                      name="direccionEntrega"
                      value={editedData.direccionEntrega}
                      onChange={(e) => setEditedData({ ...editedData, direccionEntrega: e.target.value })}
                    />
                  ) : (
                    cliente.direccionEntrega
                  )}
                </Td>
                <Td>
                  {editMode === cliente.id ? (
                    <Input
                      type="text"
                      name="horario"
                      value={editedData.horario}
                      onChange={(e) => setEditedData({ ...editedData, horario: e.target.value })}
                    />
                  ) : (
                    cliente.horario
                  )}
                </Td>
                <Td>
                  {editMode === cliente.id ? (
                    <>
                      <IconButton
                        colorScheme="green"
                        size="sm"
                        icon={<CheckIcon />}
                        onClick={() => handleConfirmEdit(cliente.id)}
                      />
                      <IconButton
                        colorScheme="red"
                        size="sm"
                        ml={0}
                        icon={<CloseIcon />}
                        onClick={handleCancelEdit}
                      />
                    </>
                  ) : (
                    <>
                      <IconButton
                        colorScheme="teal"
                        size="sm"
                        icon={<EditIcon />}
                        onClick={() => handleEditCliente(cliente.id)}
                      />
                      <IconButton
                        colorScheme="red"
                        size="sm"
                        ml={0}
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteCliente(cliente.id)}
                      />
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default RemitosClientes;
