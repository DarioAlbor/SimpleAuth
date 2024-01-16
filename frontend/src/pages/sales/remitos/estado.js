// EstadoRemitos.js

import React, { createContext, useContext, useState } from 'react';
import { IoCheckmarkOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { MdOutlinePriceCheck } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';

const EstadoRemitosContext = createContext();

export const EstadoRemitosProvider = ({ children }) => {
  const [iconosPorEstado, setIconosPorEstado] = useState({
    Pendiente: <IoCheckmarkOutline />,
    Aprobado: <IoCheckmarkDoneOutline />,
    Pagado: <MdOutlinePriceCheck />,
    Entregado: <FaCheckCircle />,
  });

  const calcularTotal = (unidades, precio, oferta, iva) => {
    const precioConDescuento = precio * (1 - oferta / 100);
    const subtotal = unidades * precioConDescuento;
    const totalConIVA = iva === '0' ? subtotal : subtotal * 1.21;
    return isNaN(totalConIVA) ? 0.0 : totalConIVA;
  };

  // Otras variables y funciones de estado que necesites

  return (
    <EstadoRemitosContext.Provider value={{ iconosPorEstado, calcularTotal }}>
      {children}
    </EstadoRemitosContext.Provider>
  );
};

export const useEstadoRemitos = () => {
  const context = useContext(EstadoRemitosContext);
  if (!context) {
    throw new Error('useEstadoRemitos debe usarse dentro de un EstadoRemitosProvider');
  }
  return context;
};