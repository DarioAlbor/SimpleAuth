// Print.js

import React, { useState, useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import axios from 'axios';
import { fechaGeneracion, horaGeneracion, generatePDF } from './templateprint';

const RemitosPrint = ({
  datosRemitos,
  uniValues,
  precioValues,
  cliente,
  ofertaValues,
  itemValues,
  ivaValues,
  totalValues,
  cantidadTotal,
  resetForm,
  importeTotal,
  vendedor,
  onSubmit,
}) => {
  const fechaGeneracion = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('es-ES', options);
  };

  const horaGeneracion = () => {
    const now = new Date();
    return now.toLocaleTimeString('es-ES');
  };

  const handleGeneratePDF = async () => {
    try {
      // Hacer la solicitud a addrto primero
      await onSubmit();
  
      // Después de hacer la solicitud a addrto, obtener el resumen
      const lastRemitoId = await traerID();
      generatePDF(
        datosRemitos,
        uniValues,
        precioValues,
        cliente,
        ofertaValues,
        itemValues,
        ivaValues,
        totalValues,
        cantidadTotal,
        importeTotal,
        vendedor,
        onSubmit,
        lastRemitoId
      );
      resetForm();
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  const traerID = async () => {
    try {
      const response = await axios.get('https://portal.drogueriagarzon.com:3001/api/remitos/resumen');
      const lastRemitoId =
        response.data.length > 0 ? response.data[response.data.length - 1].nroRemito : null;
      console.log('Último Número de Remito:', lastRemitoId);

      return lastRemitoId;
    } catch (error) {
      console.error('Error al obtener el último Número de Remito:', error);
      return null;
    }
  };

  return (
    <Flex justifyContent="center" mt={4}>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={handleGeneratePDF}
        // Deshabilita el botón si no hay cliente seleccionado
        isDisabled={!cliente}
      >
        Generar y Descargar PDF
      </Button>
    </Flex>
  );
};

export default RemitosPrint;
