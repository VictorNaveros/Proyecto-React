// src/services/userService.js

// 1. IMPORTAR LA INSTANCIA CONFIGURADA DE AXIOS
import api from '../api/axiosConfig';
import errorHandler from '../utils/errorHandler';

// 2. FUNCIÓN: OBTENER MI PERFIL
/**
 * Obtiene el perfil completo del usuario autenticado
 * REQUIERE: Token de usuario autenticado
 * @returns {Promise<Object>} Datos del usuario
 */
export const getUserProfile = async () => {
  try {
    // Hacer petición GET a /users/profile
    const response = await api.get('/users/profile');
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 3. FUNCIÓN: ACTUALIZAR MI PERFIL
/**
 * Actualiza los datos del perfil del usuario
 * REQUIERE: Token de usuario autenticado
 * @param {Object} userData - Datos a actualizar (name, phone, etc.)
 * @returns {Promise<Object>} Usuario actualizado
 */
export const updateProfile = async (userData) => {
  try {
    // Hacer petición PUT a /users/profile
    const response = await api.put('/users/profile', userData);
    
    // Actualizar usuario en localStorage
    if (response.data) {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 4. FUNCIÓN: CAMBIAR CONTRASEÑA
/**
 * Cambia la contraseña del usuario
 * REQUIERE: Token de usuario autenticado
 * @param {Object} passwords - { currentPassword, newPassword }
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const changePassword = async (passwords) => {
  try {
    // Hacer petición PUT a /users/password
    const response = await api.put('/users/password', passwords);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 5. FUNCIÓN: OBTENER MIS DIRECCIONES
/**
 * Obtiene todas las direcciones de envío del usuario
 * REQUIERE: Token de usuario autenticado
 * @returns {Promise<Array>} Array de direcciones
 */
export const getAddresses = async () => {
  try {
    // Hacer petición GET a /users/addresses
    const response = await api.get('/users/addresses');
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 6. FUNCIÓN: AGREGAR DIRECCIÓN
/**
 * Agrega una nueva dirección de envío
 * REQUIERE: Token de usuario autenticado
 * @param {Object} addressData - Datos de la dirección
 * @returns {Promise<Object>} Dirección creada
 */
export const addAddress = async (addressData) => {
  try {
    // Hacer petición POST a /users/addresses
    const response = await api.post('/users/addresses', addressData);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 7. FUNCIÓN: ACTUALIZAR DIRECCIÓN
/**
 * Actualiza una dirección existente
 * REQUIERE: Token de usuario autenticado
 * @param {string} id - ID de la dirección
 * @param {Object} addressData - Datos actualizados
 * @returns {Promise<Object>} Dirección actualizada
 */
export const updateAddress = async (id, addressData) => {
  try {
    // Hacer petición PUT a /users/addresses/:id
    const response = await api.put(`/users/addresses/${id}`, addressData);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 8. FUNCIÓN: ELIMINAR DIRECCIÓN
/**
 * Elimina una dirección de envío
 * REQUIERE: Token de usuario autenticado
 * @param {string} id - ID de la dirección a eliminar
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const deleteAddress = async (id) => {
  try {
    // Hacer petición DELETE a /users/addresses/:id
    const response = await api.delete(`/users/addresses/${id}`);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 9. FUNCIÓN: MARCAR DIRECCIÓN COMO PREDETERMINADA
/**
 * Marca una dirección como la predeterminada para envíos
 * REQUIERE: Token de usuario autenticado
 * @param {string} id - ID de la dirección
 * @returns {Promise<Object>} Dirección actualizada
 */
export const setDefaultAddress = async (id) => {
  try {
    // Hacer petición PUT a /users/addresses/:id/default
    const response = await api.put(`/users/addresses/${id}/default`);
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};