// remitosdata.js
export const calcularTotal = (unidades, precio, oferta, iva) => {
  // Lógica de cálculo del total
  const precioConDescuento = precio * (1 - oferta / 100);
  const subtotal = unidades * precioConDescuento;
  const totalConIVA = iva === 0 ? subtotal : subtotal * 1.21; // 21% IVA si es diferente de 0

  // Verificar si el resultado es NaN y devolver 0.00 en ese caso
  return isNaN(totalConIVA) ? 0.00 : totalConIVA;
};
