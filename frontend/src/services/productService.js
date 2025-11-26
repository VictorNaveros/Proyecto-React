// src/services/productService.js

// 1. IMPORTAR LA INSTANCIA CONFIGURADA DE AXIOS
import api from '../api/axiosConfig';
import errorHandler from '../utils/errorHandler';
// 2. FUNCIÓN: OBTENER TODOS LOS PRODUCTOS
/**
 * Obtiene la lista completa de productos desde el backend
 * @returns {Promise<Array>} Array de objetos producto
 */
export const getProducts = async () => {
  try {
    // Hacer petición GET a /products
    const response = await api.get('/products');
    
    // Retornar solo los datos (sin el objeto response completo)
    return response.data;
  } catch (error) {
    // Si hay error, lanzar el error para que el componente lo maneje
    throw errorHandler(error);
  }
};

// 3. FUNCIÓN: OBTENER UN PRODUCTO POR ID
/**
 * Obtiene un producto específico por su ID
 * @param {string} id - ID del producto a buscar
 * @returns {Promise<Object>} Objeto producto
 */
export const getProductById = async (id) => {
  try {
    // Hacer petición GET a /products/:id
    const response = await api.get(`/products/${id}`);
    
    return response.data;
  } catch (error) {
    
    throw errorHandler(error);
  }
};

// 4. FUNCIÓN: OBTENER PRODUCTOS POR CATEGORÍA
/**
 * Obtiene productos filtrados por categoría
 * @param {string} category - Nombre de la categoría
 * @returns {Promise<Array>} Array de productos de esa categoría
 */
export const getProductsByCategory = async (category) => {
  try {
    // Hacer petición GET con query parameter: /products?category=laptops
    const response = await api.get('/products', {
      params: { category }
    });
    
    return response.data;
  } catch (error) {
    
    throw errorHandler(error);
  }
};

// 5. FUNCIÓN: BUSCAR PRODUCTOS POR PALABRA CLAVE
/**
 * Busca productos que coincidan con una palabra clave
 * @param {string} query - Palabra clave de búsqueda
 * @returns {Promise<Array>} Array de productos que coinciden
 */
export const searchProducts = async (query) => {
  try {
    // Hacer petición GET a /products/search?q=macbook
    const response = await api.get('/products/search', {
      params: { q: query }
    });
    
    return response.data;
  } catch (error) {
    
    throw errorHandler(error);
  }
};

// 6. FUNCIÓN: CREAR UN NUEVO PRODUCTO (ADMIN)
/**
 * Crea un nuevo producto en la base de datos
 * REQUIERE: Token de administrador
 * @param {Object} productData - Datos del nuevo producto
 * @returns {Promise<Object>} Producto creado
 */
export const createProduct = async (productData) => {
  try {
    // Hacer petición POST a /products con los datos del producto
    const response = await api.post('/products', productData);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 7. FUNCIÓN: ACTUALIZAR UN PRODUCTO (ADMIN)
/**
 * Actualiza un producto existente
 * REQUIERE: Token de administrador
 * @param {string} id - ID del producto a actualizar
 * @param {Object} productData - Datos actualizados
 * @returns {Promise<Object>} Producto actualizado
 */
export const updateProduct = async (id, productData) => {
  try {
    // Hacer petición PUT a /products/:id
    const response = await api.put(`/products/${id}`, productData);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 8. FUNCIÓN: ELIMINAR UN PRODUCTO (ADMIN)
/**
 * Elimina un producto de la base de datos
 * REQUIERE: Token de administrador
 * @param {string} id - ID del producto a eliminar
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const deleteProduct = async (id) => {
  try {
    // Hacer petición DELETE a /products/:id
    const response = await api.delete(`/products/${id}`);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};