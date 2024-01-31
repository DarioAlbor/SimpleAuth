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
  const initialState = {
    datosRemitos: Array(15).fill({}),
    uniValues: Array(15).fill(''),
    itemValues: Array(15).fill(''),
    precioValues: Array(15).fill(''),
    ofertaValues: Array(15).fill('0'),
    ivaValues: Array(15).fill('0'),
    totalValues: Array(15).fill(0),
    cantidadTotal: 0,
    importeTotal: 0,
    username: '',
    clientes: [],
    clienteSeleccionado: '',
    consultasRealizadas: false,
  };

  const [state, setState] = useState(initialState);

  const textColor = useColorModeValue('black', 'white');
  const tableBorderColor = useColorModeValue('black', 'white');

  useEffect(() => {
    const nuevosTotales = state.datosRemitos.map((remito, index) => {
      return calcularTotal(
        parseFloat(state.uniValues[index]),
        parseFloat(state.precioValues[index]),
        parseFloat(state.ofertaValues[index]),
        parseFloat(state.ivaValues[index])
      );
    });

    setState((prevState) => ({
      ...prevState,
      totalValues: nuevosTotales,
      cantidadTotal: state.uniValues.reduce((total, value) => total + (parseFloat(value) || 0), 0),
      importeTotal: nuevosTotales.reduce((total, value) => total + (parseFloat(value) || 0), 0),
    }));

    if (!state.consultasRealizadas) {
      axios.get('http://portal.drogueriagarzon.com/apiuser/getUsername', { withCredentials: true })
        .then(response => setState((prevState) => ({ ...prevState, username: response.data.username })))
        .catch(error => console.error('Error al obtener el nombre de usuario:', error));

      axios.get('http://portal.drogueriagarzon.com/apiremitos/clientes/traer')
        .then(response => setState((prevState) => ({ ...prevState, clientes: response.data })))
        .catch(error => console.error('Error al obtener clientes:', error));

      setState((prevState) => ({ ...prevState, consultasRealizadas: true }));
    }
  }, [state.datosRemitos, state.uniValues, state.precioValues, state.ofertaValues, state.ivaValues, state.consultasRealizadas]);

  const handleUniChange = (index, value) => {
    setState((prevState) => {
      const newUniValues = [...prevState.uniValues];
      newUniValues[index] = value;
      return { ...prevState, uniValues: newUniValues };
    });
  };

  const resetForm = () => {
    setState(initialState);
  };

  const handleItemChange = (index, value) => {
    setState((prevState) => {
      const newItemValues = [...prevState.itemValues];
      newItemValues[index] = value;
      return { ...prevState, itemValues: newItemValues };
    });
  };

  const handlePrecioChange = (index, value) => {
    setState((prevState) => {
      const newPrecioValues = [...prevState.precioValues];
      newPrecioValues[index] = value;
      return { ...prevState, precioValues: newPrecioValues };
    });
  };

  const handleOfertaChange = (index, value) => {
    setState((prevState) => {
      const newOfertaValues = [...prevState.ofertaValues];
      newOfertaValues[index] = value;
      return { ...prevState, ofertaValues: newOfertaValues };
    });
  };

  const handleIvaChange = (index, value) => {
    setState((prevState) => {
      const newIvaValues = [...prevState.ivaValues];
      newIvaValues[index] = value;
      return { ...prevState, ivaValues: newIvaValues };
    });
  };

  const handleClienteChange = (value) => {
    setState((prevState) => ({ ...prevState, clienteSeleccionado: value }));
  };

  const handleFormSubmit = async () => {
    try {
      const filasCompletadas = state.datosRemitos.filter((remito, index) => (
        state.uniValues[index] !== '' &&
        state.itemValues[index] !== '' &&
        state.precioValues[index] !== '' &&
        state.ofertaValues[index] !== '' &&
        state.ivaValues[index] !== ''
      ));
  
      if (filasCompletadas.length === 0) {
        console.error('Error: Debes completar al menos una fila.');
        return;
      }
  
      const requestBody = {
        remitos: filasCompletadas.map((remito, index) => ({
          unidades: state.uniValues[index],
          item: state.itemValues[index],
          precio: state.precioValues[index],
          oferta: state.ofertaValues[index],
          total: state.totalValues[index],
          iva: state.ivaValues[index],
        })),
        cliente: state.clienteSeleccionado,
        vendedor: state.username,
      };
  
      const response = await axios.post('http://portal.drogueriagarzon.com/apiremitos/addrto', requestBody, { withCredentials: true });
  
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
              <Th borderTop="1px solid" borderColor={tableBorderColor} borderRight="1px solid" borderColor={tableBorderColor}>TOTAL</Th>
              <Th borderTop="1px solid" borderColor={tableBorderColor} borderRight="1px solid" borderColor={tableBorderColor}>IVA</Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.datosRemitos.map((remito, index) => (
              <Tr key={index}>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} pr={2} borderLeft="1px solid" borderRight="1px solid" borderColor={tableBorderColor}>
                  <Input
                    type="number"
                    value={state.uniValues[index]}
                    onChange={(e) => handleUniChange(index, e.target.value)}
                    size="sm" 
                    width="80%"
                  />
                </Td>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} pr={2} borderRight="1px solid" borderColor={tableBorderColor}>
                  <Input
                    value={state.itemValues[index]}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    size="sm" 
                  />
                </Td>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} pr={2} borderRight="1px solid" borderColor={tableBorderColor}>
                  <Input
                    type="number"
                    value={state.precioValues[index]}
                    onChange={(e) => handlePrecioChange(index, e.target.value)}
                    size="sm" 
                    width="80%"
                  />
                </Td>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} pr={2} borderRight="1px solid" borderColor={tableBorderColor}>
                  <Select
                    value={state.ofertaValues[index]}
                    onChange={(e) => handleOfertaChange(index, e.target.value)}
                    size="sm"
                    width="80%"
                  >
                    {[...Array(101).keys()].map((percent) => (
                      <option key={percent + 0} value={(percent + 0).toString()}>{`${percent + 0}% Descuento`}</option>
                    ))}
                  </Select>
                </Td>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} borderRight="1px solid" borderColor={tableBorderColor}>
                  {state.totalValues[index].toFixed(2)} $
                </Td>
                <Td borderBottom="1px solid" borderColor={tableBorderColor} borderRight="1px solid" borderColor={tableBorderColor}>
                  <Select
                    value={state.ivaValues[index]}
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
              <Td>{state.cantidadTotal}</Td>
              <Td colSpan={1}></Td>
            </Tr>
            <Tr>
              <Td colSpan={4}>IMPORTE TOTAL:</Td>
              <Td>{state.importeTotal.toFixed(2)} $</Td>
              <Td colSpan={1}></Td>
            </Tr>
            <Tr>
              <Td colSpan={4}>VENDEDOR:</Td>
              <Td colSpan={2}>{state.username}</Td>
            </Tr> 
            <Tr>
              <Td colSpan={4}><span style={{ color: 'red', marginLeft: '0px' }}>*</span> CLIENTE:</Td>
              <Td colSpan={2}>
                <Select
                  value={state.clienteSeleccionado}
                  onChange={(e) => handleClienteChange(e.target.value)}
                  size="sm"
                  width="80%"
                  isRequired
                >
                  <option value="" disabled hidden>
                    Seleccionar..
                  </option>
                  {state.clientes.map((cliente) => (
                    <option key={cliente.id} value={`${cliente.nombre}        CUENTA: ${cliente.numeroCuenta}        DIRECCION: ${cliente.direccionEntrega}      HORARIO:  ${cliente.horario}`}>
                      {`${cliente.nombre} - ${cliente.razonSocial}`}
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
          datosRemitos={state.datosRemitos}
          uniValues={state.uniValues}
          precioValues={state.precioValues}
          ofertaValues={state.ofertaValues}
          ivaValues={state.ivaValues}
          totalValues={state.totalValues}
          cantidadTotal={state.cantidadTotal}
          importeTotal={state.importeTotal}
          vendedor={state.username}
          cliente={state.clienteSeleccionado}
          itemValues={state.itemValues}
          onSubmit={handleFormSubmit}
          resetForm={resetForm}
        />
      </Container>
    </>
  );
};

export default RemitosContainer;
