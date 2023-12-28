import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import jsPDF from 'jspdf';

const RemitosPrint = ({ datosRemitos, uniValues, precioValues, cliente, ofertaValues, itemValues, ivaValues, totalValues, cantidadTotal, importeTotal, vendedor }) => {
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


    // Añadir encabezados de la tabla
    y += spacing;
    pdf.setFontSize(10);

    const addCell = (text, x, width) => {
      const lines = pdf.splitTextToSize(text, width - cellMargin * 2);
      pdf.rect(x, y, width, spacing); // Celda
      pdf.text(lines, x + cellMargin, y + 8);
    };

    // UNIDADES
    addCell('UNIDADES', marginLeft, cellWidths[0]);

    // ITEM
    addCell('ITEM', marginLeft + cellWidths[0], cellWidths[1]);

    // PRECIO
    addCell('PRECIO', marginLeft + cellWidths[0] + cellWidths[1], cellWidths[2]);

    // OFERTA
    addCell('OFERTA', marginLeft + cellWidths[0] + cellWidths[1] + cellWidths[2], cellWidths[3]);

    // TOTAL
    addCell('TOTAL', marginLeft + cellWidths[0] + cellWidths[1] + cellWidths[2] + cellWidths[3], cellWidths[4]);

    // IVA
    addCell('IVA', marginLeft + cellWidths[0] + cellWidths[1] + cellWidths[2] + cellWidths[3] + cellWidths[4], cellWidths[5]);

    // Añadir datos de remitos
    datosRemitos.forEach((remito, index) => {
      y += spacing;

      // UNIDADES
      addCell(`${uniValues[index] || ''}`, marginLeft, cellWidths[0]);

      // ITEM
      addCell(`${itemValues[index] || ''}`, marginLeft + cellWidths[0], cellWidths[1]);

      // PRECIO
      addCell(`${precioValues[index] || ''}`, marginLeft + cellWidths[0] + cellWidths[1], cellWidths[2]);

      // OFERTA
      addCell(`${ofertaValues[index] || ''}`, marginLeft + cellWidths[0] + cellWidths[1] + cellWidths[2], cellWidths[3]);

      // TOTAL
      addCell(`${totalValues[index] || ''}`, marginLeft + cellWidths[0] + cellWidths[1] + cellWidths[2] + cellWidths[3], cellWidths[4]);

      // IVA
      addCell(`${ivaValues[index] || ''}`, marginLeft + cellWidths[0] + cellWidths[1] + cellWidths[2] + cellWidths[3] + cellWidths[4], cellWidths[5]);
    });

    // Añadir líneas horizontales
    y += spacing;
    pdf.setLineWidth(0.1);
    pdf.line(marginLeft, y, 200, y);

    // Añadir totales
    y += spacing;
    addCell(`CANTIDAD TOTAL: ${cantidadTotal || ''}`, marginLeft, 200);

    y += spacing;
    addCell(`IMPORTE TOTAL: ${importeTotal || ''}`, marginLeft, 200);

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
