// src/services/orderService.js

// 1. IMPORTAR LA INSTANCIA CONFIGURADA DE AXIOS
import api from '../api/axiosConfig';
import errorHandler from '../utils/errorHandler';

// 2. FUNCIÓN: CREAR UN NUEVO PEDIDO
/**
 * Crea un nuevo pedido en el sistema
 * REQUIERE: Token de usuario autenticado
 * @param {Object} orderData - Datos del pedido (items, dirección, método de pago)
 * @returns {Promise<Object>} Pedido creado
 */
export const createOrder = async (orderData) => {
  try {
    // Hacer petición POST a /orders con los datos del pedido
    const response = await api.post('/orders', orderData);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 3. FUNCIÓN: OBTENER MIS PEDIDOS
/**
 * Obtiene todos los pedidos del usuario autenticado
 * REQUIERE: Token de usuario autenticado
 * @returns {Promise<Array>} Array de pedidos del usuario
 */
export const getOrders = async () => {
  try {
    // Hacer petición GET a /orders
    // El backend identifica al usuario por el token JWT
    const response = await api.get('/orders');
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 4. FUNCIÓN: OBTENER UN PEDIDO POR ID
/**
 * Obtiene el detalle de un pedido específico
 * REQUIERE: Token de usuario autenticado
 * @param {string} id - ID del pedido
 * @returns {Promise<Object>} Objeto pedido con detalles completos
 */
export const getOrderById = async (id) => {
  try {
    // Hacer petición GET a /orders/:id
    const response = await api.get(`/orders/${id}`);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 5. FUNCIÓN: OBTENER TODOS LOS PEDIDOS (ADMIN)
/**
 * Obtiene TODOS los pedidos del sistema (de todos los usuarios)
 * REQUIERE: Token de administrador
 * @returns {Promise<Array>} Array de todos los pedidos
 */
export const getAllOrders = async () => {
  try {
    // Hacer petición GET a /orders/all
    // Solo accesible para usuarios con rol 'admin'
    const response = await api.get('/orders/all');
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 6. FUNCIÓN: ACTUALIZAR ESTADO DE PEDIDO (ADMIN)
/**
 * Actualiza el estado de un pedido
 * REQUIERE: Token de administrador
 * @param {string} id - ID del pedido
 * @param {string} status - Nuevo estado (processing, shipped, delivered, cancelled)
 * @returns {Promise<Object>} Pedido actualizado
 */
export const updateOrderStatus = async (id, status) => {
  try {
    // Hacer petición PUT a /orders/:id/status
    const response = await api.put(`/orders/${id}/status`, { status });
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 7. FUNCIÓN: CANCELAR PEDIDO
/**
 * Cancela un pedido existente
 * REQUIERE: Token de usuario autenticado (solo puede cancelar sus propios pedidos)
 * @param {string} id - ID del pedido a cancelar
 * @returns {Promise<Object>} Pedido cancelado
 */
export const cancelOrder = async (id) => {
  try {
    // Hacer petición PUT a /orders/:id/cancel
    const response = await api.put(`/orders/${id}/cancel`);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 8. FUNCIÓN: OBTENER ESTADÍSTICAS DE PEDIDOS (ADMIN)
/**
 * Obtiene estadísticas de pedidos (total ventas, pedidos por estado, etc.)
 * REQUIERE: Token de administrador
 * @returns {Promise<Object>} Objeto con estadísticas
 */
export const getOrderStats = async () => {
  try {
    // Hacer petición GET a /orders/stats
    const response = await api.get('/orders/stats');
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};