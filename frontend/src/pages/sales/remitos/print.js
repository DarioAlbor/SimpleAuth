import React, { useState, useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import axios from 'axios';

const RemitosPrint = ({ datosRemitos, uniValues, precioValues, cliente, ofertaValues, itemValues, ivaValues, totalValues, cantidadTotal, importeTotal, vendedor, onSubmit }) => {

  const fechaGeneracion = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('es-ES', options);
  };

  const horaGeneracion = () => {
    const now = new Date();
    return now.toLocaleTimeString('es-ES');
  };

  const traerID = async () => {
    try {
      const response = await axios.get('http://45.162.169.217:3001/api/remitos/resumen');  
      const lastRemitoId = response.data.length > 0 ? response.data[response.data.length - 1].id : null;
      console.log('Último ID:', lastRemitoId); // Agrega este log para depurar
  
      return lastRemitoId;
    } catch (error) {
      console.error('Error al obtener el último ID:', error);
      return null;
    }
  };
  

  const handleGeneratePDF = async () => {
    try {
      const lastRemitoId = await traerID();
      console.log('Last Remito ID:', lastRemitoId); // Agregar este log para depurar
  
      // Generar el PDF
      await generatePDF(lastRemitoId);
  
      // Llamar a la función onSubmit
      onSubmit();
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  const generatePDF = (lastRemitoId) => {
    return new Promise((resolve) => {
    const pdf = new jsPDF();

    // Definir la posición inicial y el espaciado
    let y = 10;
    const spacing = 10;
    const marginLeft = 5;
    const cellWidths = [31, 34, 35, 35, 35, 30];
    const cellMargin = 1;
  
    // Agregar la imagen en la parte superior
    const logoImg = new Image();
    logoImg.src = `${process.env.PUBLIC_URL}/images/logonegro.jpg`;
  
    pdf.addImage(logoImg, 'JPEG', 60, 10, 80, 30);
  
    // Añadir líneas horizontales
    pdf.setLineWidth(0.1);
    pdf.line(marginLeft, y, 200, y);

    // Añadir nombre del VENDEDOR, FECHA y HORA en la misma línea
    y += 40; // Ajustar la posición después de la imagen
    pdf.setFontSize(12);
    pdf.text(`VENDEDOR: ${vendedor}`, marginLeft, y, { align: 'left' });
    pdf.text(`FECHA: ${fechaGeneracion()}`, 100, y, { align: 'center' });
    pdf.text(`HORA: ${horaGeneracion()}`, 200, y, { align: 'right' });

    // Añadir líneas horizontales
    y += spacing;
    pdf.setLineWidth(0.1);
    pdf.line(marginLeft, y, 200, y);

    // Añadir el nombre del CLIENTE
    y += 6;
    pdf.setFontSize(12);
    pdf.text(`CLIENTE: ${cliente}`, 100, y, { align: 'center' });
    
    // Añadir el REMITO
    y += 6;
    pdf.setFontSize(12);
    pdf.text(`REMITO: ${lastRemitoId}`, 100, y, { align: 'center' });

  // Añadir encabezados de la tabla
  y += spacing;
  pdf.setFontSize(10);

  const addCell = (text, x, width, isCurrency = false, isPercentage = false) => {
    let formattedText = '';
  
    if (text !== '') {
      if (isCurrency && !isNaN(text)) {
        formattedText = `$${parseFloat(text).toFixed(2)}`;
      } else if (isPercentage && !isNaN(text)) {
        formattedText = `${parseFloat(text).toFixed(2)}%`;
      } else {
        formattedText = text;
      }
    }
  
    // Verificar si el texto resultante es "$NaN" y ajustar a cadena vacía
    formattedText = formattedText === '$NaN' ? '' : formattedText;
  
    const lines = pdf.splitTextToSize(formattedText, width - cellMargin * 2);
    pdf.rect(x, y, width, spacing); // Celda
    pdf.text(lines, x + cellMargin, y + 8);
  };

  const addCellWithHeader = (text, x, width) => {
    const lines = pdf.splitTextToSize(text, width - cellMargin * 2);
    const textHeight = lines.length * 8; // Ajusta según el tamaño de la fuente

    // Calcula la posición y el ancho para centrar el texto en la celda
    const textWidth = pdf.getStringUnitWidth(lines.join('')) * 2;
    const xCentered = x + (width - textWidth) / 20;
    const yCentered = y + (pdf.internal.pageSize.height - textHeight) / 300;

    // Celda del encabezado
    pdf.rect(x, yCentered, width, textHeight);
    
    // Alinea el texto horizontalmente y verticalmente en el centro de la celda
    pdf.text(lines, xCentered + cellMargin, yCentered + textHeight / 2, { align: 'left' });
};

  
  // UNIDADES (más corta)
  addCellWithHeader('UNIDADES', marginLeft, 21); // Ajusta según el tamaño de la fuente y preferencias
  
  // ITEM (ajustado, más larga)
  addCellWithHeader('ITEM', marginLeft + 21, 75); // Ajusta según tus necesidades
  
  // PRECIO (movido a la derecha)
  addCellWithHeader('PRECIO', marginLeft + 21 + 75, 35); // Ajusta según tus necesidades
  
  // OFERTA (movido a la derecha)
  addCellWithHeader('OFERTA', marginLeft + 21 + 75 + 35, 20 ); // Ajusta según tus necesidades
  
  // TOTAL (movido a la derecha)
  addCellWithHeader('TOTAL', marginLeft + 21 + 75 + 35 + 20, 50); // Ajusta según tus necesidades

    // Añadir datos de remitos
    datosRemitos.forEach((remito, index) => {
      y += spacing;

// UNIDADES (más corta)
addCell(`${uniValues[index] || ''}`, marginLeft, 21); // Ajusta según el tamaño de la fuente y preferencias

// ITEM (ajustado, más larga)
addCell(`${itemValues[index] || ''}`, marginLeft + 21, 75); // Ajusta según tus necesidades

// PRECIO (movido a la derecha)
addCell(`${precioValues[index] || ''}`, marginLeft + 21 + 75, 35, true); // Ajusta según tus necesidades, isCurrency = true

// OFERTA (movido a la derecha)
addCell(`${ofertaValues[index] || ''}`, marginLeft + 21 + 75 + 35, 20, false, true); // Ajusta según tus necesidades, isPercentage = true

// TOTAL (movido a la derecha)
addCell(`${totalValues[index] || ''}`, marginLeft + 21 + 75 + 35 + 20, 50, true); // Ajusta según tus necesidades, isCurrency = true
    });

    y += spacing;

    const convertirImporteTotal = (importeTotal) => {
      const importeNumerico = parseFloat(importeTotal);
      if (isNaN(importeNumerico)) {
        return '$0.00';
      } else {
        return `$${importeNumerico.toFixed(2)}`;
      }
    };

// Añadir totales
y += spacing;
addCell(`CANTIDAD TOTAL: ${cantidadTotal || ''}`, marginLeft, 200);

y += spacing;
addCell(`IMPORTE TOTAL: ${convertirImporteTotal(importeTotal)}`, marginLeft, 200);

// Añadir espacio adicional
y += spacing * 2;

// Añadir filas adicionales
addCell('PREPARÓ', marginLeft, 60);
addCell('CONTROLÓ', marginLeft + 60, 70);
addCell('RECIBIÓ', marginLeft + 130, 70);

// Añadir segunda fila
y += spacing;
pdf.rect(marginLeft, y, 60, spacing * 3); // Celda PREPARÓ
pdf.rect(marginLeft + 60, y, 70, spacing * 3); // Celda CONTROLÓ
pdf.rect(marginLeft + 130, y, 70, spacing * 3); // Celda RECIBIÓ

// FOOTER
y += spacing * 4.5;
pdf.setLineWidth(0.1);
pdf.line(marginLeft, y, 200, y); // Ajusta la longitud de la línea según tus necesidades
y += spacing * 0.5;
pdf.setFontSize(8);
pdf.text(`info@drogueriagarzon.com`, marginLeft, y, { align: 'left' });
pdf.text(`www.drogueriagarzon.com`, 100, y, { align: 'center' });
pdf.text(`4635-9600`, 200, y, { align: 'right' });

// Descargar PDF
pdf.save('remito.pdf');
resolve();
});
};

return (
<Flex justifyContent="center" mt={4}>
  <Button
    colorScheme="teal"
    variant="outline"
    onClick={handleGeneratePDF}
  >
    Generar y Descargar PDF
  </Button>
</Flex>
);
};
export default RemitosPrint;