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
  const [newEstado, setNewEstado] = useState('');

  const handleRowClick = (index, remito) => {
    setExpandedRow(expandedRow === index ? null : index);
    setDetalleRemito(remito);
  };

  const handleDeleteRemito = async (nroRemito) => {
    try {
      const confirmar = window.confirm('¿Estás seguro de que quieres eliminar este remito?');

      if (!confirmar) {
        return;
      }

      const response = await axios.delete(`https://portal.drogueriagarzon.com:3001/api/remitos/eliminar/nroRemito/${nroRemito}`);
      console.log('Respuesta del servidor al eliminar el remito:', response.data);

      cargarRemitos();
    } catch (error) {
      console.error('Error al eliminar el remito:', error);
    }
  };

  const handleSaveEstado = async (nroRemito) => {
    try {
      const remitosToUpdate = remitos
        .filter(remito => remito.nroRemito === nroRemito && remito.estado === 'Aprobado')
        .map(remito => remito.id);

      if (remitosToUpdate.length === 0) {
        return;
      }

      const estadoToUpdate = newEstado !== 'Aprobado' ? newEstado : 'Aprobado';

      await Promise.all(
        remitosToUpdate.map(async (remitoId) => {
          const response = await axios.put(`https://portal.drogueriagarzon.com:3001/api/remitos/editar/${remitoId}`, {
            estado: estadoToUpdate,
          });
          console.log('Respuesta del servidor al actualizar estado del remito:', response.data);
        })
      );

      cargarRemitos();
    } catch (error) {
      console.error('Error al actualizar estado de remitos:', error);
    }
  };

  const cargarRemitos = async () => {
    try {
      const response = await axios.get('https://portal.drogueriagarzon.com:3001/api/remitos/resumen', {
        withCredentials: true,
      });

      setRemitos(response.data);

      const uniqueNumbers = Array.from(new Set(response.data.map(remito => remito.nroRemito)));
      setUniqueRemitoNumbers(uniqueNumbers);
    } catch (error) {
      console.error('Error al obtener remitos:', error);
    }
  };

  useEffect(() => {
    cargarRemitos();
  }, []);

  return (
    <Container maxW="container.lg" mt={8}>
      <h1>Remitos</h1>
      {remitos.length === 0 ? (
        <Center>
          <Box mt={5}>
            <Icon as={FaSadCry} boxSize={50} ml={20} color="gray.500" />
            <Text mt={0} fontSize="lg" color="gray.500">No hay remitos</Text>
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
                    value={newEstado}
                    onChange={(e) => setNewEstado(e.target.value)}
                    isDisabled={firstRemitoWithNumber.estado === 'Pagado'} // Deshabilitar si el remito está pagado
                    >
                    <option value="Aprobado" disabled={firstRemitoWithNumber.estado === 'Pagado'}>Aprobado</option>
                    <option value="Pagado">Pagado</option>
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
                        onClick={() => handleDeleteRemito(firstRemitoWithNumber.nroRemito)}
                        isDisabled={firstRemitoWithNumber.estado === 'Pagado'} // Deshabilitar si el remito está pagado
                        variant="ghost"
                        colorScheme="red"
                      />
                      <IconButton
                        aria-label="Guardar Estado"
                        icon={<Icon as={FaSave} />}
                        onClick={() => handleSaveEstado(firstRemitoWithNumber.nroRemito)}
                        isDisabled={firstRemitoWithNumber.estado === 'Pagado'} // Deshabilitar si el remito está pagado
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
