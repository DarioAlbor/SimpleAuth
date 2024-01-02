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
  Button,
} from '@chakra-ui/react';
import { calcularTotal } from './data';
import RemitosPrint from './print';
import axios from 'axios';

const RemitosContainer = () => {
  const [datosRemitos, setDatosRemitos] = useState(Array(10).fill({}));
  const [uniValues, setUniValues] = useState(Array(10).fill(''));
  const [itemValues, setItemValues] = useState(Array(10).fill(''));
  const [precioValues, setPrecioValues] = useState(Array(10).fill(''));
  const [ofertaValues, setOfertaValues] = useState(Array(10).fill('0'));
  const [ivaValues, setIvaValues] = useState(Array(10).fill('0'));
  const [totalValues, setTotalValues] = useState(Array(10).fill(0));
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [importeTotal, setImporteTotal] = useState(0);
  const [username, setUsername] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [consultasRealizadas, setConsultasRealizadas] = useState(false); // Nuevo estado

  const textColor = useColorModeValue('black', 'white'); // Ajusta el color del texto según el modo de color
  const tableBorderColor = useColorModeValue('gray.200', 'gray.600'); // Ajusta el color del borde de la tabla según el modo de color


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
  
    // Realizar las consultas solo si aún no se han realizado
    if (!consultasRealizadas) {
      axios.get('http://45.162.169.217:3001/api/user/getUsername', { withCredentials: true })
        .then(response => setUsername(response.data.username))
        .catch(error => console.error('Error al obtener el nombre de usuario:', error));
  
      axios.get('http://45.162.169.217:3001/api/remitos/clientes/traer')
        .then(response => setClientes(response.data))
        .catch(error => console.error('Error al obtener clientes:', error));
  
      // Marcar las consultas como realizadas
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
      // Filtrar solo las filas que han sido completadas por el usuario
      const filasCompletadas = datosRemitos.filter((remito, index) => (
        uniValues[index] !== '' &&
        itemValues[index] !== '' &&
        precioValues[index] !== '' &&
        ofertaValues[index] !== '' &&
        ivaValues[index] !== ''
      ));
  
      // Validar que al menos una fila haya sido completada
      if (filasCompletadas.length === 0) {
        console.error('Error: Debes completar al menos una fila.');
        return;
      }
  
      // Construir el cuerpo de la solicitud solo con las filas completadas
      const requestBody = {
        unidades: filasCompletadas.map((remito, index) => uniValues[index]),
        item: filasCompletadas.map((remito, index) => itemValues[index]),
        precio: filasCompletadas.map((remito, index) => precioValues[index]),
        oferta: filasCompletadas.map((remito, index) => ofertaValues[index]),
        total: filasCompletadas.map((remito, index) => totalValues[index]),
        iva: filasCompletadas.map((remito, index) => ivaValues[index]),
        cliente: clienteSeleccionado,
        vendedor: username,
      };
  
      
      // Realizar la solicitud POST al backend
      await axios.post('http://45.162.169.217:3001/api/remitos/addrto', requestBody, { withCredentials: true });

  
      // Aquí puedes manejar el éxito de la creación del remito, por ejemplo, mostrar un mensaje al usuario
      console.log('Remito creado exitosamente');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
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
              <Td colSpan={4}>CLIENTE:</Td>
              <Td colSpan={2}>
              <Select
  value={clienteSeleccionado}  // Asegúrate de que el valor inicial sea la cadena que esperas
  onChange={(e) => handleClienteChange(e.target.value)}
  size="sm"
  width="80%"
>
  {clientes.map((cliente) => (
    <option key={cliente.id} value={`${cliente.nombre} - ${cliente.razonSocial}`}>
      {cliente.nombre} - {cliente.razonSocial}
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
