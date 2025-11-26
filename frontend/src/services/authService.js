// src/services/authService.js

// 1. IMPORTAR LA INSTANCIA CONFIGURADA DE AXIOS
import api from '../api/axiosConfig';
import errorHandler from '../utils/errorHandler';

// 2. FUNCIÓN: REGISTRAR NUEVO USUARIO
/**
 * Registra un nuevo usuario en el sistema
 * @param {Object} userData - Datos del usuario (name, email, password)
 * @returns {Promise<Object>} Usuario creado + token
 */
export const register = async (userData) => {
  try {
    // Hacer petición POST a /auth/register
    const response = await api.post('/auth/register', userData);
    
    // Si el registro es exitoso, guardar token y usuario en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 3. FUNCIÓN: INICIAR SESIÓN (LOGIN)
/**
 * Inicia sesión de un usuario existente
 * @param {Object} credentials - Credenciales (email, password)
 * @returns {Promise<Object>} Usuario + token
 */
export const login = async (credentials) => {
  try {
    // Hacer petición POST a /auth/login
    const response = await api.post('/auth/login', credentials);
    
    // Si el login es exitoso, guardar token y usuario en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 4. FUNCIÓN: CERRAR SESIÓN (LOGOUT)
/**
 * Cierra la sesión del usuario actual
 * Limpia el token y datos del usuario del localStorage
 */
export const logout = () => {
  try {
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Opcional: Hacer petición al backend para invalidar el token
    // api.post('/auth/logout');
    
    console.log('Sesión cerrada correctamente');
  } catch (error) {
    throw errorHandler(error);
  }
};

// 5. FUNCIÓN: OBTENER USUARIO ACTUAL
/**
 * Obtiene los datos del usuario actualmente logueado
 * REQUIERE: Token válido
 * @returns {Promise<Object>} Datos del usuario actual
 */
export const getCurrentUser = async () => {
  try {
    // Hacer petición GET a /auth/profile
    // El interceptor agregará automáticamente el token
    const response = await api.get('/auth/profile');
    
    // Actualizar datos del usuario en localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

// 6. FUNCIÓN: VERIFICAR SI HAY USUARIO LOGUEADO
/**
 * Verifica si hay un usuario logueado (tiene token válido)
 * @returns {boolean} true si hay token, false si no
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;  // Convierte token a boolean
};

// 7. FUNCIÓN: OBTENER TOKEN DEL LOCALSTORAGE
/**
 * Obtiene el token JWT del localStorage
 * @returns {string|null} Token JWT o null si no existe
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

// 8. FUNCIÓN: OBTENER USUARIO DEL LOCALSTORAGE
/**
 * Obtiene los datos del usuario del localStorage
 * @returns {Object|null} Objeto usuario o null si no existe
 */
export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// 9. FUNCIÓN: REFRESH TOKEN
/**
 * Refresca el token JWT cuando está por expirar
 * @returns {Promise<Object>} Nuevo token
 */
export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh');
    
    // Guardar nuevo token
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};