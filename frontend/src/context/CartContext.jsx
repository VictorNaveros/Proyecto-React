// src/context/CartContext.jsx

// ============================================
// IMPORTS
// ============================================
import { createContext, useState, useEffect } from 'react';

// ============================================
// CREAR EL CONTEXTO
// ============================================
const CartContext = createContext();

// ============================================
// PROVIDER COMPONENT
// ============================================
const CartProvider = ({ children }) => {
  // ------------------------------------
  // ESTADO DEL CARRITO
  // ------------------------------------
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // ------------------------------------
  // CARGAR CARRITO DESDE LOCALSTORAGE AL INICIAR
  // ------------------------------------
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart_items');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      }
    } catch (error) {
      console.error('Error al cargar carrito:', error);
      localStorage.removeItem('cart_items');
    }
  }, []);

  // ------------------------------------
  // GUARDAR EN LOCALSTORAGE CUANDO CAMBIA ITEMS
  // ------------------------------------
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items));
    calculateTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // ------------------------------------
  // FUNCIÓN: Calcular totales
  // ------------------------------------
  const calculateTotals = () => {
    const newTotal = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    const newItemCount = items.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
    
    setTotal(newTotal);
    setItemCount(newItemCount);
  };

  // ------------------------------------
  // FUNCIÓN: Agregar producto al carrito
  // ------------------------------------
  const addToCart = (product, quantity = 1) => {
    setItems(prevItems => {
      // Verificar si el producto ya existe en el carrito
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si existe, incrementar cantidad
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, agregarlo
        return [...prevItems, { 
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity
        }];
      }
    });
  };

  // ------------------------------------
  // FUNCIÓN: Eliminar producto del carrito
  // ------------------------------------
  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // ------------------------------------
  // FUNCIÓN: Actualizar cantidad de un producto
  // ------------------------------------
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Si la cantidad es 0 o negativa, eliminar el producto
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // ------------------------------------
  // FUNCIÓN: Incrementar cantidad en 1
  // ------------------------------------
  const incrementQuantity = (productId) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ------------------------------------
  // FUNCIÓN: Decrementar cantidad en 1
  // ------------------------------------
  const decrementQuantity = (productId) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity - 1;
          
          // Si la cantidad llega a 0, no hacer nada aquí
          // El usuario debe eliminar manualmente
          if (newQuantity <= 0) {
            return item; // Mantener cantidad en 1
          }
          
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  // ------------------------------------
  // FUNCIÓN: Vaciar carrito completamente
  // ------------------------------------
  const clearCart = () => {
    setItems([]);
    setTotal(0);
    setItemCount(0);
    localStorage.removeItem('cart_items');
  };

  // ------------------------------------
  // FUNCIÓN: Verificar si un producto está en el carrito
  // ------------------------------------
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  // ------------------------------------
  // FUNCIÓN: Obtener cantidad de un producto específico
  // ------------------------------------
  const getItemQuantity = (productId) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // ------------------------------------
  // VALUE: Todo lo que compartiremos
  // ------------------------------------
  const value = {
    // Estado
    items,
    total,
    itemCount,
    
    // Funciones
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  };

  // ------------------------------------
  // RENDERIZAR PROVIDER
  // ------------------------------------
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Exportar
export { CartContext, CartProvider };