import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Box,
  Text,
  Input,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { calcularTotal } from './data';

import axios from 'axios';
import RemitosPrint from './print';


const RemitosContainer = ({ generatePDF }) => {
  const [datosRemitos, setDatosRemitos] = useState(Array(15).fill({}));
  const [uniValues, setUniValues] = useState(Array(15).fill(''));
  const [itemValues, setItemValues] = useState(Array(15).fill(''));
  const [precioValues, setPrecioValues] = useState(Array(15).fill(''));
  const [ofertaValues, setOfertaValues] = useState(Array(15).fill('0'));
  const [ivaValues, setIvaValues] = useState(Array(15).fill('0'));
  const [totalValues, setTotalValues] = useState(Array(15).fill(0));
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [importeTotal, setImporteTotal] = useState(0);
  const [username, setUsername] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [consultasRealizadas, setConsultasRealizadas] = useState(false);

  const textColor = useColorModeValue('black', 'white');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const nuevosTotales = datosRemitos.map((remito, index) => {
      return calcularTotal(
        parseFloat(uniValues[index]),
        parseFloat(precioValues[index]),
        parseFloat(ofertaValues[index]),
        parseFloat(ivaValues[index])
      );
    });

    setTotalValues(nuevosTotales);

    const nuevaCantidadTotal = uniValues.reduce((total, value) => total + (parseFloat(value) || 0), 0);
    setCantidadTotal(nuevaCantidadTotal);

    const nuevoImporteTotal = nuevosTotales.reduce((total, value) => total + (parseFloat(value) || 0), 0);
    setImporteTotal(nuevoImporteTotal);

    if (!consultasRealizadas) {
      axios.get('http://localhost:3001/api/user/getUsername', { withCredentials: true })
        .then(response => setUsername(response.data.username))
        .catch(error => console.error('Error al obtener el nombre de usuario:', error));

      axios.get('http://localhost:3001/api/remitos/clientes/traer')
        .then(response => setClientes(response.data))
        .catch(error => console.error('Error al obtener clientes:', error));

      setConsultasRealizadas(true);
    }
  }, [datosRemitos, uniValues, precioValues, ofertaValues, ivaValues, consultasRealizadas]);

  const handleUniChange = (index, value) => {
    const newUniValues = [...uniValues];
    newUniValues[index] = value;
    setUniValues(newUniValues);
  };

  const handleItemChange = (index, value) => {
    const newItemValues = [...itemValues];
    newItemValues[index] = value;
    setItemValues(newItemValues);
  };

  const handlePrecioChange = (index, value) => {
    const newPrecioValues = [...precioValues];
    newPrecioValues[index] = value;
    setPrecioValues(newPrecioValues);
  };

  const handleOfertaChange = (index, value) => {
    const newOfertaValues = [...ofertaValues];
    newOfertaValues[index] = value;
    setOfertaValues(newOfertaValues);
  };

  const handleIvaChange = (index, value) => {
    const newIvaValues = [...ivaValues];
    newIvaValues[index] = value;
    setIvaValues(newIvaValues);
  };

  const handleClienteChange = (value) => {
    setClienteSeleccionado(value);
  };

  const handleFormSubmit = async () => {
    try {
      const filasCompletadas = datosRemitos.filter((remito, index) => (
        uniValues[index] !== '' &&
        itemValues[index] !== '' &&
        precioValues[index] !== '' &&
        ofertaValues[index] !== '' &&
        ivaValues[index] !== ''
      ));
  
      if (filasCompletadas.length === 0) {
        console.error('Error: Debes completar al menos una fila.');
        return;
      }
  
      const requestBody = {
        remitos: filasCompletadas.map((remito, index) => ({
          unidades: uniValues[index],
          item: itemValues[index],
          precio: precioValues[index],
          oferta: ofertaValues[index],
          total: totalValues[index],
          iva: ivaValues[index],
        })),
        cliente: clienteSeleccionado,
        vendedor: username,
      };
  
      const response = await axios.post('http://localhost:3001/api/remitos/addrto', requestBody, { withCredentials: true });
  
      if (response.status === 201) {
        console.log('Remito creado exitosamente');
  
        // Ahora, después de que se ha creado el remito, generamos el PDF
        generatePDF();
      } else {
        console.error('Error al crear el remito. Estado:', response.status);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <>
      <Container maxW="container.lg" mt={8}>
        <Box mb={4}>
          <Text fontSize="xl" fontWeight="bold" color={textColor}>Detalle del Remito</Text>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th borderTop="1px solid" borderColor={tableBorderColor} pr={2} borderRight="1px solid" borderLeft="1px solid" borderColor={tableBorderColor} width="10%">UNIDADES</Th>
              <Th borderTop="1px solid" borderColor={tableBorderColor} pr={2} borderRight="1px solid" borderColor={tableBorderColor}>ITEM</Th>
              <Th borderTop="1px solid" borderColor={tableBorderColor} pr={2} borderRight="1px solid" borderColor={tableBorderColor} width="20%">PRECIO</Th>
              <Th borderTop="1px solid" borderColor={tableBorderColor} pr={2} borderRight="1px solid" borderColor={tableBorderColor}>OFERTA</Th>
              <Th borderTop="1px solid" borderColor={tableBorderColor} borderRight="s solid" borderColor={tableBorderColor}>TOTAL</Th>
              <Th borderTop="1px solid" borderColor={tableBorderColor} borderRight="1px solid" borderColor={tableBorderColor}>IVA</Th>
            </Tr>
          </Thead>
          <Tbody>
            {datosRemitos.map((remito, index) => (
              <Tr key={index}>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} pr={2} borderLeft="1px solid" borderRight="1px solid" borderColor={tableBorderColor}>
                  <Input
                    type="number"
                    value={uniValues[index]}
                    onChange={(e) => handleUniChange(index, e.target.value)}
                    size="sm" 
                    width="80%"
                  />
                </Td>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} pr={2} borderRight="1px solid" borderColor={tableBorderColor}>
                  <Input
                    value={itemValues[index]}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    size="sm" 
                  />
                </Td>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} pr={2} borderRight="1px solid" borderColor={tableBorderColor}>
                  <Input
                    type="number"
                    value={precioValues[index]}
                    onChange={(e) => handlePrecioChange(index, e.target.value)}
                    size="sm" 
                    width="80%"
                  />
                </Td>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} pr={2} borderRight="1px solid" borderColor={tableBorderColor}>
                  <Select
                    value={ofertaValues[index]}
                    onChange={(e) => handleOfertaChange(index, e.target.value)}
                    size="sm"
                    width="80%"
                  >
                    {[...Array(21).keys()].map((percent) => (
                      <option key={percent + 0} value={(percent + 0).toString()}>{`${percent + 0}% Descuento`}</option>
                    ))}
                  </Select>
                </Td>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} borderRight="1px solid" borderColor={tableBorderColor}>
                  {totalValues[index].toFixed(2)} $
                </Td>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} borderRight="1px solid" borderColor={tableBorderColor}>
                  <Select
                    value={ivaValues[index]}
                    onChange={(e) => handleIvaChange(index, e.target.value)}
                    size="sm"
                    width="80%"
                  >
                    <option value="0">0% IVA</option>
                    <option value="21">21% IVA</option>
                  </Select>
                </Td>
              </Tr>
            ))}
            {/* Nueva fila para CANTIDAD TOTAL, IMPORTE TOTAL, VENDEDOR y CLIENTE */}
            <Tr>
              <Td colSpan={4}>CANTIDAD TOTAL:</Td>
              <Td>{cantidadTotal}</Td>
              <Td colSpan={1}></Td>
            </Tr>
            <Tr>
              <Td colSpan={4}>IMPORTE TOTAL:</Td>
              <Td>{importeTotal.toFixed(2)} $</Td>
              <Td colSpan={1}></Td>
            </Tr>
            <Tr>
              <Td colSpan={4}>VENDEDOR:</Td>
              <Td colSpan={2}>{username}</Td>
            </Tr> 
            <Tr>
        <Td colSpan={4}><span style={{ color: 'red', marginLeft: '0px' }}>*</span> CLIENTE:</Td>
        <Td colSpan={2}>
          <Select
            value={clienteSeleccionado}
            onChange={(e) => handleClienteChange(e.target.value)}
            size="sm"
            width="80%"
            isRequired
          >
            <option value="" disabled hidden>
              Seleccionar..
            </option>
            {clientes.map((cliente) => (
        <option key={cliente.id} value={`${cliente.nombre} RAZON SOCIAL: ${cliente.razonSocial} ID: ${cliente.numeroCuenta} DIRECCION: ${cliente.direccionEntrega}`}>
        {`${cliente.nombre} - ${cliente.razonSocial} - ${cliente.numeroCuenta} - ${cliente.direccionEntrega}`}
              </option>
            ))}
          </Select>
        </Td>
      </Tr>
          </Tbody>
        </Table>
                </Container>

<Container maxW="container.lg" mt={8}>
  <RemitosPrint
    datosRemitos={datosRemitos}
    uniValues={uniValues}
    precioValues={precioValues}
    ofertaValues={ofertaValues}
    ivaValues={ivaValues}
    totalValues={totalValues}
    cantidadTotal={cantidadTotal}
    importeTotal={importeTotal}
    vendedor={username}
    cliente={clienteSeleccionado}
    itemValues={itemValues}
    onSubmit={handleFormSubmit}
        />
    </Container>
  </>
);
};

export default RemitosContainer;
