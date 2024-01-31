  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import {
    Container,
    Box,
    Table,
    Tbody,
    Tr,
    Td,
    Th,
    Thead,
    IconButton,
    Icon,
    Select,
    Center,
    Text,
  } from "@chakra-ui/react";
  import { FaAngleDown, FaTrash, FaSave, FaSadCry } from 'react-icons/fa';

  const Panel = () => {
    const [remitos, setRemitos] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [detalleRemito, setDetalleRemito] = useState({});
    const [uniqueRemitoNumbers, setUniqueRemitoNumbers] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState('');

    const cargarRemitos = async () => {
      try {
        const response = await axios.get('http://drogueriagarzon.com:3001/api/remitos/resumen', {
          withCredentials: true,
        });

        const remitosPendientes = response.data.filter(remito => remito.estado === 'Pendiente');
        setRemitos(remitosPendientes);

        // Identificar números de remito únicos
        const uniqueNumbers = Array.from(new Set(remitosPendientes.map(remito => remito.nroRemito)));
        setUniqueRemitoNumbers(uniqueNumbers);
      } catch (error) {
        console.error('Error al obtener remitos pendientes:', error);
      }
    };

    const handleRowClick = (index, remito) => {
      setExpandedRow(expandedRow === index ? null : index);
      setDetalleRemito(remito);
    };

    const handleDeleteRemitoAll = async (nroRemito) => {
      try {
        // Confirmar si el usuario realmente quiere eliminar todo el remito
        const confirmar = window.confirm('¿Estás seguro de que quieres eliminar todo el remito?');

        if (!confirmar) {
          return; // Cancelar eliminación
        }

        // Llamar a la función para eliminar todo el remito
        const response = await axios.delete(`http://drogueriagarzon.com:3001/api/remitos/eliminar/nroRemito/${nroRemito}`);
        console.log('Respuesta del servidor al eliminar todo el remito:', response.data);

        // Actualizar la lista de remitos después de la eliminación
        cargarRemitos();
      } catch (error) {
        console.error('Error al eliminar todo el remito:', error);
      }
    };

    const handleEstadoChange = (newEstado) => {
      setSelectedEstado(newEstado);
    };

    const handleSaveEstado = async (nroRemito) => {
      try {
        // Filtrar los remitos aprobados
        const remitosAprobados = remitos
          .filter(remito => remito.nroRemito === nroRemito && remito.estado === 'Pendiente')
          .map(remito => remito.id);

        if (remitosAprobados.length === 0) {
          // No hay remitos pendientes para aprobar
          return;
        }

        // Enviar solicitudes para editar el estado de cada remito
        await Promise.all(
          remitosAprobados.map(async (remitoId) => {
            const response = await axios.put(`http://drogueriagarzon.com:3001/api/remitos/editar/${remitoId}`, {
              estado: selectedEstado,
            });
            console.log('Respuesta del servidor al aprobar remito:', response.data);
          })
        );

        // Actualizar la lista de remitos después de la edición
        cargarRemitos();
      } catch (error) {
        console.error('Error al aprobar remitos:', error);
      }
    };

    useEffect(() => {
      cargarRemitos();
    }, []);

    return (
      <Container maxW="container.lg" mt={8}>
        <h1>Remitos Pendientes</h1>
        {remitos.length === 0 ? (
          <Center>
            <Box mt={5}>
              <Icon as={FaSadCry} boxSize={50} ml={20} color="gray.500" />
              <Text mt={0} fontSize="lg" color="gray.500">No hay remitos pendientes</Text>
            </Box>
          </Center>
        ) : (
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Número de Remito</Th>
                <Th>Vendedor</Th>
                <Th>Cliente</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {uniqueRemitoNumbers.map((uniqueNumber, index) => {
                const firstRemitoWithNumber = remitos.find(remito => remito.nroRemito === uniqueNumber);

                return (
                  <React.Fragment key={uniqueNumber}>
                    <Tr>
                      <Td>{uniqueNumber}</Td>
                      <Td>{firstRemitoWithNumber.vendedor}</Td>
                      <Td>{firstRemitoWithNumber.cliente}</Td>
                      <Td>
                        <Select
                          value={selectedEstado}
                          onChange={(e) => handleEstadoChange(e.target.value)}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Aprobado">Aprobado</option>
                        </Select>
                      </Td>
                      <Td>
                        <IconButton
                          aria-label="Expandir Detalles"
                          icon={<Icon as={FaAngleDown} />}
                          onClick={() => handleRowClick(index, firstRemitoWithNumber)}
                          variant="ghost"
                          colorScheme="teal"
                        />
                        <IconButton
                          aria-label="Borrar Remito"
                          icon={<Icon as={FaTrash} />}
                          onClick={() => handleDeleteRemitoAll(firstRemitoWithNumber.nroRemito)}
                          variant="ghost"
                          colorScheme="red"
                        />
                        <IconButton
                          aria-label="Guardar Estado"
                          icon={<Icon as={FaSave} />}
                          onClick={() => handleSaveEstado(firstRemitoWithNumber.nroRemito)}
                          variant="ghost"
                          colorScheme="green"
                        />
                      </Td>
                    </Tr>
                    {expandedRow === index && (
                      <Tr>
                        <Td colSpan={4}>
                          <Box p={4}>
                            <Table variant="striped" colorScheme="teal">
                              <Thead>
                                <Tr>
                                  <Th>Unidades</Th>
                                  <Th>Item</Th>
                                  <Th>Precio</Th>
                                  <Th>IVA</Th>
                                  <Th>Oferta</Th>
                                  <Th>Total</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {remitos
                                  .filter(remito => remito.nroRemito === uniqueNumber)
                                  .map((renglon, idx) => (
                                    <Tr key={idx}>
                                      <Td>{renglon.unidades}</Td>
                                      <Td>{renglon.item}</Td>
                                      <Td>{`$${parseFloat(renglon.precio).toFixed(2)}`}</Td>
                                      <Td>{`${renglon.iva}%`}</Td>
                                      <Td>{`${renglon.oferta}%`}</Td>
                                      <Td>{`$${parseFloat(renglon.total).toFixed(2)}`}</Td>
                                    </Tr>
                                  ))}
                              </Tbody>
                            </Table>
                          </Box>
                        </Td>
                      </Tr>
                    )}
                  </React.Fragment>
                );
              })}
            </Tbody>
          </Table>
        )}
      </Container>
    );
  };

  export default Panel;
