// src/hooks/useCart.js

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Custom Hook para usar el CartContext
 * 
 * Ejemplo de uso:
 * const { items, total, addToCart, removeFromCart } = useCart();
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart debe ser usado dentro de un CartProvider. ' +
      'Asegúrate de envolver tu componente con <CartProvider>.'
    );
  }

  return context;
};