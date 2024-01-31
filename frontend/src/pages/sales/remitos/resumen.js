// ResumenRemitos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import {
  Container,
  Box,
  Text,
  Table,
  Divider,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
  Tooltip,
  IconButton,
  Icon,
  Input,
  Select,
} from "@chakra-ui/react";
import { FaAngleDown, FaEdit, FaTrash, FaCheckCircle, FaPrint } from 'react-icons/fa';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { IoCheckmarkOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { MdOutlinePriceCheck } from 'react-icons/md';
import { generateReprintPDF } from './reimpresion';

const calcularTotal = (unidades, precio, oferta, iva) => {
  const precioConDescuento = precio * (1 - oferta / 100);
  const subtotal = unidades * precioConDescuento;
  const totalConIVA = iva === '0' ? subtotal : subtotal * 1.21;
  return isNaN(totalConIVA) ? 0.0 : totalConIVA;
};

const obtenerIconoPorEstado = (estado) => {
  switch (estado) {
    case 'Pendiente':
      return <IoCheckmarkOutline />;
    case 'Aprobado':
      return <IoCheckmarkDoneOutline />;
    case 'Pagado':
      return <MdOutlinePriceCheck />;
    case 'Entregado':
      return <FaCheckCircle />;
    default:
      return null;
  }
};

const obtenerTextoTooltip = (estado) => {
  switch (estado) {
    case 'Pendiente':
      return 'Este remito aún no tiene asignada una baja.';
    case 'Aprobado':
      return 'Este remito ya tiene una baja, falta ser pagado.';
    case 'Pagado':
      return 'Este remito ha sido pagado, próximamente será entregado.';
    case 'Entregado':
      return 'Este remito ha sido entregado.';
    default:
      return '';
  }
};

const ResumenRemitos = () => {
  const [remitos, setRemitos] = useState([]);
  const [vendedorUsername, setVendedorUsername] = useState('');
  const [remitosDelVendedor, setRemitosDelVendedor] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [detalleRemito, setDetalleRemito] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState({});

  const cargarVendedorUsername = async () => {
    try {
      const response = await axios.get('http://portal.drogueriagarzon.com:3001/api/user/getUsername', {
        withCredentials: true,
      });
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

      const response = await axios.get('http://portal.drogueriagarzon.com:3001/api/remitos/resumen', {
        withCredentials: true,
      });
      const remitosDelVendedor = response.data.filter(
        (remito) => remito.vendedor === vendedorUsername
      );

      const remitosUnicos = new Set();
      const remitosFiltrados = remitosDelVendedor.filter((remito) => {
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

  const handleRowClick = (index, remito) => {
    setExpandedRow(expandedRow === index ? null : index);
    setDetalleRemito(remito);
  };

  const handleEditRemito = (renglonId) => {
    const renglonToEdit = remitosDelVendedor.find((renglon) => renglon.id === renglonId);
    setEditMode(renglonId);
    setEditedData({
      unidades: renglonToEdit.unidades,
      item: renglonToEdit.item,
      precio: renglonToEdit.precio,
      iva: renglonToEdit.iva,
      oferta: renglonToEdit.oferta,
      total: renglonToEdit.total,
    });
  };  

  const handleConfirmEdit = async (remitoId) => {
    try {
      const response = await axios.put(`http://portal.drogueriagarzon.com:3001/api/remitos/editar/${remitoId}`, {
        unidades: editedData.unidades,
        item: editedData.item,
        precio: editedData.precio,
        iva: editedData.iva,
        oferta: editedData.oferta,
        total: editedData.total,
      });

      console.log('Respuesta del servidor al confirmar edición:', response.data);
      setEditMode(null);
      cargarRemitos();
    } catch (error) {
      console.error('Error al confirmar edición:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedData({});
  };

  // Función para eliminar un remito individual
  const handleDeleteRemito = async (remitoId) => {
    try {
      const response = await axios.delete(`http://portal.drogueriagarzon.com:3001/api/remitos/eliminar/${remitoId}`);
      console.log('Respuesta del servidor al eliminar remito:', response.data);
      cargarRemitos();
    } catch (error) {
      console.error('Error al eliminar remito:', error);
    }
  };

  // Función para eliminar todo el remito
  const handleDeleteRemitoAll = async (nroRemito) => {
    try {
      // Confirmar si el usuario realmente quiere eliminar todo el remito
      const confirmar = window.confirm('¿Estás seguro de que quieres eliminar todo el remito?');

      if (!confirmar) {
        return; // Cancelar eliminación
      }

      // Llamar a la función para eliminar todo el remito
      const response = await axios.delete(`http://portal.drogueriagarzon.com:3001/api/remitos/eliminar/nroRemito/${nroRemito}`);
      console.log('Respuesta del servidor al eliminar todo el remito:', response.data);

      // Actualizar la lista de remitos después de la eliminación
      cargarRemitos();
    } catch (error) {
      console.error('Error al eliminar todo el remito:', error);
    }
  };

  // REIMPRIMIR 
  const handleReimprimirRemito = async (remitoId) => {
    try {
      // Obtener datos del remito desde el servidor (puedes ajustar esto según tu implementación)
      const response = await axios.get(`http://portal.drogueriagarzon.com:3001/api/remitos/detalle/${remitoId}`, {
        withCredentials: true,
      });

      const remitoData = response.data;

      // Ajustar la estructura de los datos para que coincida con la función generatePrintData
      const remitoDataFormatted = [{
        vendedor: remitoData[0].vendedor,
        nroRemito: remitoData[0].nroRemito,
        cliente: remitoData[0].cliente,
        cantidadTotal: remitoData.reduce((total, detalle) => total + parseInt(detalle.unidades), 0),
        importeTotal: remitoData.reduce((total, detalle) => total + parseFloat(detalle.total), 0).toFixed(2),
        detalleRemitos: remitoData,
      }];

      // Generar datos de impresión
      const printData = generateReprintPDF(remitoDataFormatted);

      // Generar el PDF utilizando la función existente
      generatePDFFromPrintData(printData);
    } catch (error) {
      console.error('Error al reimprimir remito:', error);
    }
  };

  const generatePDFFromPrintData = (printData) => {
    const pdf = new jsPDF();
    let y = 5;
    const spacing = 10;
    const marginLeft = 5;

    printData.forEach((element) => {
      if (element.line) {
        pdf.setLineWidth(0.1);
        pdf.line(marginLeft, y, 200, y);
      } else {
        pdf.setFontSize(12);
        pdf.text(element.text, marginLeft, y, { align: element.align, width: element.width });
      }
      y += spacing;
    });

    pdf.save('remito.pdf');
  };

  useEffect(() => {
    cargarVendedorUsername();
  }, []);

  useEffect(() => {
    cargarRemitos();
  }, [vendedorUsername]);

  return (
    <Container maxW="container.lg" mt={8}>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Número de Remito</Th>
            <Th>Cliente</Th>
            <Th>Estado</Th>
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
                  <Tooltip label={obtenerTextoTooltip(remito.estado)} placement="top" hasArrow>
                    <span>{obtenerIconoPorEstado(remito.estado)}</span>
                  </Tooltip>
                </Td>
                <Td>
                  <IconButton
                    aria-label="Expandir Detalles"
                    icon={<Icon as={FaAngleDown} />}
                    onClick={() => handleRowClick(index, remito)}
                    variant="ghost"
                    colorScheme="teal"
                  />
                  <IconButton
                    aria-label="Borrar Remito"
                    icon={<Icon as={FaTrash} />}
                    onClick={() => handleDeleteRemitoAll(remito.nroRemito)}
                    variant="ghost"
                    colorScheme="red"
                    isDisabled={remito.estado === 'Aprobado'}
                    opacity={remito.estado === 'Aprobado' ? 0.5 : 1}
                  />
                  <IconButton
                    aria-label="Reimprimir"
                    icon={<Icon as={FaPrint} />}
                    onClick={() => handleReimprimirRemito(remito.nroRemito)} 
                    variant="ghost"
                    colorScheme="teal"
                  />
                </Td>
              </Tr>
              {expandedRow === index && (
                <Tr>
                  <Td colSpan={7}>
                    <Box p={4}>
                      <Text fontSize="lg" fontWeight="bold">
                        Detalles del Remito
                      </Text>
                      <Table variant="striped" colorScheme="teal">
                        <Thead>
                          <Tr>
                            <Th>Unidades</Th>
                            <Th>Item</Th>
                            <Th>Precio</Th>
                            <Th>IVA</Th>
                            <Th>Oferta</Th>
                            <Th>Total</Th>
                            <Th>Acción</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {remitosDelVendedor
                            .filter((r) => r.nroRemito === detalleRemito.nroRemito)
                            .map((renglon, idx) => (
                              <Tr key={idx}>
                                <Td>
                                  {editMode === renglon.id ? (
                                    <Input
                                      type="text"
                                      name="unidades"
                                      value={editedData.unidades}
                                      onChange={(e) =>
                                        setEditedData({
                                          ...editedData,
                                          unidades: e.target.value,
                                          total: calcularTotal(
                                            e.target.value,
                                            editedData.precio,
                                            editedData.oferta,
                                            editedData.iva
                                          ),
                                        })
                                      }
                                    />
                                  ) : (
                                    renglon.unidades
                                  )}
                                </Td>
                                <Td>
                                  {editMode === renglon.id ? (
                                    <Input
                                      type="text"
                                      name="item"
                                      value={editedData.item}
                                      onChange={(e) =>
                                        setEditedData({
                                          ...editedData,
                                          item: e.target.value,
                                        })
                                      }
                                    />
                                  ) : (
                                    renglon.item
                                  )}
                                </Td>
                                <Td>
                                  {editMode === renglon.id ? (
                                    <Input
                                      type="text"
                                      name="precio"
                                      value={editedData.precio}
                                      onChange={(e) =>
                                        setEditedData({
                                          ...editedData,
                                          precio: e.target.value,
                                          total: calcularTotal(
                                            editedData.unidades,
                                            e.target.value,
                                            editedData.oferta,
                                            editedData.iva
                                          ),
                                        })
                                      }
                                    />
                                  ) : (
                                    `$${parseFloat(renglon.precio).toFixed(2)}`
                                  )}
                                </Td>
                                <Td>
                                  {editMode === renglon.id ? (
                                    <Select
                                      name="iva"
                                      value={editedData.iva}
                                      onChange={(e) =>
                                        setEditedData({
                                          ...editedData,
                                          iva: e.target.value,
                                          total: calcularTotal(
                                            editedData.unidades,
                                            editedData.precio,
                                            editedData.oferta,
                                            e.target.value
                                          ),
                                        })
                                      }
                                    >
                                      <option value="21">21%</option>
                                      <option value="0">0%</option>
                                    </Select>
                                  ) : (
                                    `${renglon.iva}%`
                                  )}
                                </Td>
                                <Td>
                                  {editMode === renglon.id ? (
                                    <Select
                                      name="oferta"
                                      value={editedData.oferta}
                                      onChange={(e) =>
                                        setEditedData({
                                          ...editedData,
                                          oferta: e.target.value,
                                          total: calcularTotal(
                                            editedData.unidades,
                                            editedData.precio,
                                            e.target.value,
                                            editedData.iva
                                          ),
                                        })
                                      }
                                    >
                                      {[...Array(101).keys()].map((value) => (
                                        <option key={value} value={value}>
                                          {`${value}%`}
                                        </option>
                                      ))}
                                    </Select>
                                  ) : (
                                    `${renglon.oferta}%`
                                  )}
                                </Td>
                                <Td>
                                  <Text>
                                    {editMode === renglon.id
                                      ? calcularTotal(
                                          editedData.unidades,
                                          editedData.precio,
                                          editedData.oferta,
                                          editedData.iva
                                        )
                                      : calcularTotal(
                                          renglon.unidades,
                                          renglon.precio,
                                          renglon.oferta,
                                          renglon.iva
                                        )}
                                  </Text>
                                </Td>
                                <Td>
                                  {editMode === renglon.id ? (
                                    <>
                                      <IconButton
                                        colorScheme="green"
                                        size="sm"
                                        icon={<CheckIcon />}
                                        onClick={() => handleConfirmEdit(renglon.id)}
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
                              aria-label="Editar Renglón"
                              icon={<Icon as={FaEdit} />}
                              onClick={() => handleEditRemito(renglon.id)}
                              variant="ghost"
                              colorScheme="teal"
                              isDisabled={remito.estado === 'Aprobado'}
                              opacity={remito.estado === 'Aprobado' ? 0.5 : 1}
                            />
                                  <IconButton
                                    aria-label="Borrar Renglón"
                                    icon={<Icon as={FaTrash} />}
                                    onClick={() => handleDeleteRemito(remito.id)}
                                    variant="ghost"
                                    colorScheme="red"
                                    isDisabled={remito.estado === 'Aprobado'}
                                    opacity={remito.estado === 'Aprobado' ? 0.5 : 1}
                                  />
                                    </>
                                  )}
                                </Td>
                              </Tr>
                            ))}
                        </Tbody>
                      </Table>
                      <Divider mt={4} mb={2} />
                      <Box>
                        <Text fontSize="sm" fontWeight="bold">
                          Importe Total: {remitosDelVendedor
                            .filter((r) => r.nroRemito === detalleRemito.nroRemito)
                            .reduce((total, detalle) => total + parseFloat(detalle.total), 0)
                            .toFixed(2)}
                        </Text>
                        <Text fontSize="sm" fontWeight="bold">
                          Cantidades Totales: {remitosDelVendedor
                            .filter((r) => r.nroRemito === detalleRemito.nroRemito)
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