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

const PanelAprobados = () => {
  const [remitos, setRemitos] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [detalleRemito, setDetalleRemito] = useState({});
  const [uniqueRemitoNumbers, setUniqueRemitoNumbers] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');

  const cargarRemitosAprobados = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/remitos/resumen', {
        withCredentials: true,
      });

      const remitosAprobados = response.data.filter(remito => remito.estado === 'Aprobado');
      setRemitos(remitosAprobados);

      // Identificar números de remito únicos
      const uniqueNumbers = Array.from(new Set(remitosAprobados.map(remito => remito.nroRemito)));
      setUniqueRemitoNumbers(uniqueNumbers);
    } catch (error) {
      console.error('Error al obtener remitos aprobados:', error);
    }
  };

  const handleRowClick = (index, remito) => {
    setExpandedRow(expandedRow === index ? null : index);
    setDetalleRemito(remito);
  };

  // Función de manejo de borrar remito (inhabilitada para remitos aprobados)
  const handleDeleteRemito = (remitoId) => {
    console.log('No se puede borrar un remito aprobado.');
  };

  // Función de manejo de editar estado (inhabilitada para remitos aprobados)
  const handleSaveEstado = (nroRemito) => {
    console.log('No se puede editar el estado de un remito aprobado.');
  };

  useEffect(() => {
    cargarRemitosAprobados();
  }, []);

  return (
    <Container maxW="container.lg" mt={8}>
      <h1>Pendientes de pago</h1>
      <h1><b>CON BAJA ⚠️</b></h1>
      {remitos.length === 0 ? (
        <Center>
          <Box mt={5}>
            <Icon as={FaSadCry} boxSize={50} ml={20} color="gray.500" />
            <Text mt={0} fontSize="lg" color="gray.500">No hay remitos aprobados</Text>
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
                        isDisabled={true} // Deshabilitar la selección de estado
                      >
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
                        onClick={() => handleDeleteRemito(firstRemitoWithNumber.id)}
                        isDisabled={true} // Deshabilitar el botón de borrar
                        variant="ghost"
                        colorScheme="red"
                      />
                      <IconButton
                        aria-label="Guardar Estado"
                        icon={<Icon as={FaSave} />}
                        onClick={() => handleSaveEstado(firstRemitoWithNumber.nroRemito)}
                        isDisabled={true} // Deshabilitar el botón de guardar estado
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

export default PanelAprobados;
