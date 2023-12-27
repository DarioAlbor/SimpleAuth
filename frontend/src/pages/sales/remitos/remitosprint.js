import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import jsPDF from 'jspdf';

const RemitosPrint = ({ datosRemitos, uniValues, precioValues, ofertaValues, itemValues, ivaValues, totalValues, cantidadTotal, importeTotal, vendedor }) => {
  const fechaGeneracion = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('es-ES', options);
  };

  const horaGeneracion = () => {
    const now = new Date();
    return now.toLocaleTimeString('es-ES');
  };

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Definir la posición inicial y el espaciado
    let y = 15;
    const spacing = 10;

    // Añadir FECHA y HORA
    pdf.setFontSize(12);
    pdf.text(`FECHA: ${fechaGeneracion()}`, 14, y);
    pdf.text(`HORA: ${horaGeneracion()}`, 150, y);

    // Añadir líneas horizontales
    y += spacing;
    pdf.setLineWidth(0.1);
    pdf.line(14, y, 200, y);

    // Añadir nombre del VENDEDOR
    y += spacing;
    pdf.text(`VENDEDOR: ${vendedor}`, 14, y, { align: 'center' });

    // Añadir líneas horizontales
    y += spacing;
    pdf.setLineWidth(0.1);
    pdf.line(14, y, 200, y);

    // Añadir encabezados de la tabla
    y += spacing;
    pdf.setFontSize(10);

    // UNIDADES
    pdf.rect(14, y, 31, spacing); // Celda
    pdf.text('UNIDADES', 15, y + 8);

    // ITEM
    pdf.rect(45, y, 34, spacing); // Celda
    pdf.text('ITEM', 46, y + 8);

    // PRECIO
    pdf.rect(80, y, 35, spacing); // Celda
    pdf.text('PRECIO', 81, y + 8);

    // OFERTA
    pdf.rect(115, y, 35, spacing); // Celda
    pdf.text('OFERTA', 116, y + 8);

    // TOTAL
    pdf.rect(150, y, 35, spacing); // Celda
    pdf.text('TOTAL', 151, y + 8);

    // IVA
    pdf.rect(185, y, 30, spacing); // Celda
    pdf.text('IVA', 186, y + 8);

    // Añadir líneas horizontales
    y += spacing;
    pdf.setLineWidth(0.1);
    pdf.line(14, y, 200, y);

    // Añadir datos de remitos
    datosRemitos.forEach((remito, index) => {
      y += spacing;

      // UNIDADES
      pdf.rect(14, y, 31, spacing); // Celda
      pdf.text(`${uniValues[index] || ''}`, 15, y + 8);

      // ITEM
      pdf.rect(45, y, 34, spacing); // Celda
      pdf.text(`${itemValues[index] || ''}`, 46, y + 8);

      // PRECIO
      pdf.rect(80, y, 35, spacing); // Celda
      pdf.text(`${precioValues[index] || ''}`, 81, y + 8);

      // OFERTA
      pdf.rect(115, y, 35, spacing); // Celda
      pdf.text(`${ofertaValues[index] || ''}`, 116, y + 8);

      // TOTAL
      pdf.rect(150, y, 35, spacing); // Celda
      pdf.text(`${totalValues[index] || ''}`, 151, y + 8);

      // IVA
      pdf.rect(185, y, 30, spacing); // Celda
      pdf.text(`${ivaValues[index] || ''}`, 186, y + 8);
    });

    // Añadir líneas horizontales
    y += spacing;
    pdf.setLineWidth(0.1);
    pdf.line(14, y, 200, y);

    // Añadir totales
    y += spacing;
    pdf.text(`CANTIDAD TOTAL: ${cantidadTotal || ''}`, 14, y);

    y += spacing;
    pdf.text(`IMPORTE TOTAL: ${importeTotal || ''}`, 14, y);

    // Añadir espacio adicional
    y += spacing * 2;

    // Añadir filas adicionales
    pdf.text('PREPARÓ', 14, y);
    pdf.text('CONTROLÓ', 80, y);
    pdf.text('RECIBIÓ', 150, y);

    // Añadir segunda fila
    y += spacing;
    pdf.rect(14, y, 31, spacing); // Celda PREPARÓ
    pdf.rect(80, y, 35, spacing); // Celda CONTROLÓ
    pdf.rect(150, y, 35, spacing); // Celda RECIBIÓ

    // Descargar PDF
    pdf.save('remito.pdf');
  };

  return (
    <Flex justifyContent="center" mt={4}>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={generatePDF}
      >
        Generar y Descargar PDF
      </Button>
    </Flex>
  );
};

export default RemitosPrint;
