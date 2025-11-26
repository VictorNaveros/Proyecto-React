// src/services/categoryService.js

// 1. IMPORTAR LA INSTANCIA CONFIGURADA DE AXIOS
import api from '../api/axiosConfig';
import errorHandler from '../utils/errorHandler';

// 2. FUNCIÓN: OBTENER TODAS LAS CATEGORÍAS
/**
 * Obtiene la lista completa de categorías disponibles
 * NO requiere autenticación (endpoint público)
 * @returns {Promise<Array>} Array de categorías
 */
export const getCategories = async () => {
  try {
    // Hacer petición GET a /categories
    const response = await api.get('/categories');
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 3. FUNCIÓN: OBTENER UNA CATEGORÍA POR ID
/**
 * Obtiene el detalle de una categoría específica
 * NO requiere autenticación (endpoint público)
 * @param {string} id - ID de la categoría
 * @returns {Promise<Object>} Objeto categoría con productos relacionados
 */
export const getCategoryById = async (id) => {
  try {
    // Hacer petición GET a /categories/:id
    const response = await api.get(`/categories/${id}`);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 4. FUNCIÓN: OBTENER PRODUCTOS DE UNA CATEGORÍA
/**
 * Obtiene todos los productos que pertenecen a una categoría
 * NO requiere autenticación (endpoint público)
 * @param {string} categoryId - ID de la categoría
 * @returns {Promise<Array>} Array de productos
 */
export const getCategoryProducts = async (categoryId) => {
  try {
    // Hacer petición GET a /categories/:id/products
    const response = await api.get(`/categories/${categoryId}/products`);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 5. FUNCIÓN: OBTENER CATEGORÍAS POPULARES
/**
 * Obtiene las categorías más populares (con más productos o más vendidas)
 * NO requiere autenticación (endpoint público)
 * @returns {Promise<Array>} Array de categorías populares
 */
export const getPopularCategories = async () => {
  try {
    // Hacer petición GET a /categories/popular
    const response = await api.get('/categories/popular');
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};