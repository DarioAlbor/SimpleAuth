import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Container, Box, Text, Input, Select } from '@chakra-ui/react';
import { calcularTotal } from './remitosdata';
import RemitosPrint from './remitosprint';
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

    const nuevoImporteTotal = totalValues.reduce((total, value) => total + (parseFloat(value) || 0), 0);
    setImporteTotal(nuevoImporteTotal);

    axios.get('http://localhost:3001/api/user/getUsername', { withCredentials: true })
      .then(response => setUsername(response.data.username))
      .catch(error => console.error('Error fetching username:', error));
  }, [datosRemitos, uniValues, precioValues, ofertaValues, ivaValues, totalValues]);

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

  return (
    <>
      <Container maxW="container.lg" mt={8}>
        <Box mb={4}>
          <Text fontSize="xl" fontWeight="bold">Detalle del Remito</Text>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th borderTop="1px solid" borderColor="gray.200" pr={2} borderRight="1px solid" borderLeft="1px solid" borderColor="gray.200" width="10%">UNIDADES</Th>
              <Th borderTop="1px solid" borderColor="gray.200" pr={2} borderRight="1px solid" borderColor="gray.200">ITEM</Th>
              <Th borderTop="1px solid" borderColor="gray.200" pr={2} borderRight="1px solid" borderColor="gray.200" width="20%">PRECIO</Th>
              <Th borderTop="1px solid" borderColor="gray.200" pr={2} borderRight="1px solid" borderColor="gray.200">OFERTA</Th>
              <Th borderTop="1px solid" borderColor="gray.200" borderRight="1px solid" borderColor="gray.200">TOTAL</Th>
              <Th borderTop="1px solid" borderColor="gray.200" borderRight="1px solid" borderColor="gray.200">IVA</Th>
            </Tr>
          </Thead>
          <Tbody>
            {datosRemitos.map((remito, index) => (
              <Tr key={index}>
                <Td borderBottom="1px solid" borderColor="gray.200" pr={2} borderLeft="1px solid" borderRight="1px solid" borderColor="gray.200">
                  <Input
                    type="number"
                    value={uniValues[index]}
                    onChange={(e) => handleUniChange(index, e.target.value)}
                    size="sm" 
                    width="80%"
                  />
                </Td>
                <Td borderBottom="1px solid" borderColor="gray.200" pr={2} borderRight="1px solid" borderColor="gray.200">
                  <Input
                    value={itemValues[index]}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    size="sm" 
                  />
                </Td>
                <Td borderBottom="1px solid" borderColor="gray.200" pr={2} borderRight="1px solid" borderColor="gray.200">
                  <Input
                    type="number"
                    value={precioValues[index]}
                    onChange={(e) => handlePrecioChange(index, e.target.value)}
                    size="sm" 
                    width="80%"
                  />
                </Td>
                <Td borderBottom="1px solid" borderColor="gray.200" pr={2} borderRight="1px solid" borderColor="gray.200">
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
                <Td borderBottom="1px solid" borderColor="gray.200" borderRight="1px solid" borderColor="gray.200">
                  {totalValues[index].toFixed(2)} $
                </Td>
                <Td borderBottom="1px solid" borderColor="gray.200" borderRight="1px solid" borderColor="gray.200">
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
            {/* Nueva fila para CANTIDAD TOTAL, IMPORTE TOTAL y username */}
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
          itemValues={itemValues}
        />
      </Container>
    </>
  );
};

export default RemitosContainer;
