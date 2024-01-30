// Reimpresion.js

import jsPDF from 'jspdf';
import { fechaGeneracion, horaGeneracion } from './templateprint';

const generateReprintPDF = (remitoData) => {
  const pdf = new jsPDF();
  let y = 5;
  const spacing = 10;
  const marginLeft = 5;
  const cellWidths = [31, 34, 35, 35, 35, 30];
  const cellMargin = 1;

  // Añadir líneas horizontales
  pdf.setLineWidth(0.1);
  pdf.line(marginLeft, y, 200, y);

  // Añadir nombre del VENDEDOR, FECHA y HORA en la misma línea
  y += 5;
  pdf.setFontSize(12);
  pdf.text(`VENDEDOR: ${remitoData[0].vendedor}`, marginLeft, y, { align: 'left' });
  pdf.text(`FECHA: ${fechaGeneracion()}`, 100, y, { align: 'center' });
  pdf.text(`HORA: ${horaGeneracion()}`, 200, y, { align: 'right' });
  y += 6;
  pdf.setFontSize(12);
  pdf.text(`REMITO: ${remitoData[0].nroRemito}`, 100, y, { align: 'center' });

  // Añadir líneas horizontales
  y += 5;
  pdf.setLineWidth(0.1);
  pdf.line(marginLeft, y, 200, y);

  // Añadir el nombre del CLIENTE
  y += 6;
  pdf.setFontSize(7);
  pdf.text(`CLIENTE: ${remitoData[0].cliente}`, 100, y, { align: 'center' });

  // Añadir encabezados de la tabla
  y += spacing;
  pdf.setFontSize(10);

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
  addCellWithHeader('UNIDADES', marginLeft, 21);

  // ITEM (ajustado, más larga)
  addCellWithHeader('ITEM', marginLeft + 21, 75);

  // PRECIO (movido a la derecha)
  addCellWithHeader('PRECIO', marginLeft + 21 + 75, 35);

  // OFERTA (movido a la derecha)
  addCellWithHeader('OFERTA', marginLeft + 21 + 75 + 35, 20);

  // TOTAL (movido a la derecha)
  addCellWithHeader('TOTAL', marginLeft + 21 + 75 + 35 + 20, 50);

  // Añadir datos de remitos
  remitoData.forEach((remito) => {
    remito.detalleRemitos.forEach((detalle) => {
      y += spacing;

      // UNIDADES (más corta)
      addCellWithHeader(`${detalle.unidades || ''}`, marginLeft, 21);

      // ITEM (ajustado, más larga)
      addCellWithHeader(`${detalle.item || ''}`, marginLeft + 21, 75);

      // PRECIO (movido a la derecha)
      addCellWithHeader(`${detalle.precio || ''}`, marginLeft + 21 + 75, 35);

      // OFERTA (movido a la derecha)
      addCellWithHeader(`${detalle.oferta || ''}`, marginLeft + 21 + 75 + 35, 20);

      // TOTAL (movido a la derecha)
      addCellWithHeader(`${detalle.total || ''}`, marginLeft + 21 + 75 + 35 + 20, 50);
    });
  });

  // Añadir espacio adicional
  y += spacing * 2;

  // Añadir filas adicionales
  addCellWithHeader('PREPARÓ', marginLeft, 60);
  addCellWithHeader('CONTROLÓ', marginLeft + 60, 70);
  addCellWithHeader('RECIBIÓ', marginLeft + 130, 70);

  // Añadir segunda fila
  y += spacing;
  pdf.rect(marginLeft, y, 60, spacing * 3); // Celda PREPARÓ
  pdf.rect(marginLeft + 60, y, 70, spacing * 3); // Celda CONTROLÓ
  pdf.rect(marginLeft + 130, y, 70, spacing * 3); // Celda RECIBIÓ

  // FOOTER
  y += spacing * 4.5;
  pdf.setLineWidth(0.1);
  pdf.line(marginLeft, y, 200, y);
  y += spacing * 0.5;
  pdf.setFontSize(8);
  pdf.text(`ESTE DOCUMENTO NO TIENE VALIDEZ ALGUNA`, marginLeft, y, { align: 'left' });
  pdf.text(`ESTE DOCUMENTO NO TIENE VALIDEZ ALGUNA`, 100, y, { align: 'center' });
  pdf.text(`ESTE DOCUMENTO NO TIENE VALIDEZ ALGUNA`, 200, y, { align: 'right' });

  // Descargar PDF
  pdf.save('reimpresion.pdf');
};

export { generateReprintPDF };
