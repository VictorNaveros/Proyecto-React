// src/api/axiosConfig.js

// 1. IMPORTAR AXIOS
import axios from 'axios';

// 2. CREAR INSTANCIA DE AXIOS CON CONFIGURACIÓN BASE
const api = axios.create({
  // URL base del backend (TODA petición se hace a esta dirección + el endpoint)
  baseURL: 'http://localhost:5000/api',
  
  // Timeout: Si el servidor no responde en 10 segundos, cancelar petición
  timeout: 10000,
  
  // Headers por defecto para TODAS las peticiones
  headers: {
    'Content-Type': 'application/json',
  }
});

// 3. INTERCEPTOR DE REQUEST (se ejecuta ANTES de enviar la petición)
// Analogía: Como el guardia de seguridad que revisa tu bolso ANTES de entrar
api.interceptors.request.use(
  // Función que modifica la petición antes de enviarla
  (config) => {
    // Obtener el token JWT del localStorage
    const token = localStorage.getItem('token');
    
    // Si existe token, agregarlo al header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Retornar la configuración modificada
    return config;
  },
  // Función que maneja errores ANTES de enviar la petición
  (error) => {
    console.error('Error en request interceptor:', error);
    return Promise.reject(error);
  }
);

// 4. INTERCEPTOR DE RESPONSE (se ejecuta DESPUÉS de recibir la respuesta)
// Analogía: Como el guardia que revisa tu bolso DESPUÉS de salir
api.interceptors.response.use(
  // Función que se ejecuta cuando la respuesta es EXITOSA (status 200-299)
  (response) => {
    // Simplemente retornar la respuesta sin modificar
    return response;
  },
  
  // Función que se ejecuta cuando la respuesta es ERROR (status 400-599)
  (error) => {
    // Obtener el código de error
    const status = error.response?.status;
    
    // MANEJO DE ERRORES ESPECÍFICOS
    switch (status) {
      case 401:
        // Error 401: No autorizado (token inválido o expirado)
        console.error('Error 401: Token inválido o expirado');
        
        // Limpiar token del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirigir al login (comentado por ahora)
        // window.location.href = '/login';
        break;
        
      case 403:
        // Error 403: Prohibido (no tienes permisos)
        console.error('Error 403: No tienes permisos para esta acción');
        break;
        
      case 404:
        // Error 404: No encontrado
        console.error('Error 404: Recurso no encontrado');
        break;
        
      case 500:
        // Error 500: Error interno del servidor
        console.error('Error 500: Error en el servidor');
        break;
        
      default:
        // Cualquier otro error
        console.error(`Error ${status}:`, error.response?.data?.message || 'Error desconocido');
    }
    
    // Rechazar la promesa para que el error se propague
    return Promise.reject(error);
  }
);

// 5. EXPORTAR LA INSTANCIA CONFIGURADA
export default api;