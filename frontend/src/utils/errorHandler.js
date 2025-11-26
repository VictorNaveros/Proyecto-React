// src/utils/errorHandler.js

/**
 * Maneja errores de peticiones Axios de forma centralizada
 * @param {Error} error - Error de Axios
 * @returns {Object} Objeto de error estandarizado
 */
export const errorHandler = (error) => {
  // Inicializar objeto de error por defecto
  let errorObject = {
    message: 'Ha ocurrido un error. Por favor intenta de nuevo.',
    statusCode: 500,
    details: null
  };

  // CASO 1: Error de respuesta del servidor (backend respondió con error)
  if (error.response) {
    const { status, data } = error.response;
    
    // Extraer mensaje del backend
    const message = data?.message || data?.error || errorObject.message;
    
    errorObject = {
      message,
      statusCode: status,
      details: data
    };

    // Mensajes específicos según código de error
    switch (status) {
      case 400:
        errorObject.message = message || 'Solicitud inválida. Verifica los datos ingresados.';
        break;
      case 401:
        errorObject.message = 'No autorizado. Por favor inicia sesión.';
        break;
      case 403:
        errorObject.message = 'No tienes permisos para realizar esta acción.';
        break;
      case 404:
        errorObject.message = 'Recurso no encontrado.';
        break;
      case 409:
        errorObject.message = message || 'Conflicto. El recurso ya existe.';
        break;
      case 422:
        errorObject.message = message || 'Datos de validación incorrectos.';
        break;
      case 500:
        errorObject.message = 'Error interno del servidor. Por favor intenta más tarde.';
        break;
      case 503:
        errorObject.message = 'Servicio no disponible. Por favor intenta más tarde.';
        break;
      default:
        errorObject.message = message;
    }
  } 
  // CASO 2: Error de petición (no se pudo enviar la petición)
  else if (error.request) {
    errorObject = {
      message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
      statusCode: 0,
      details: error.request
    };
  } 
  // CASO 3: Error al configurar la petición
  else {
    errorObject = {
      message: error.message || errorObject.message,
      statusCode: 0,
      details: null
    };
  }

  // Logging en consola (útil para debugging)
  console.error('Error capturado por errorHandler:', {
    status: errorObject.statusCode,
    message: errorObject.message,
    details: errorObject.details
  });

  return errorObject;
};

/**
 * Extrae mensaje de error de validación del backend
 * @param {Object} error - Error de Axios
 * @returns {string} Mensaje de error legible
 */
export const getValidationErrorMessage = (error) => {
  if (error.response?.data?.errors) {
    // Si el backend envía array de errores de validación
    const errors = error.response.data.errors;
    
    // Unir todos los mensajes en uno solo
    if (Array.isArray(errors)) {
      return errors.map(err => err.message || err.msg).join(', ');
    }
    
    // Si es objeto con campos
    if (typeof errors === 'object') {
      return Object.values(errors).join(', ');
    }
  }
  
  return error.response?.data?.message || 'Error de validación';
};

/**
 * Verifica si es un error de autenticación
 * @param {Object} error - Error de Axios
 * @returns {boolean} true si es error 401
 */
export const isAuthError = (error) => {
  return error.response?.status === 401;
};

/**
 * Verifica si es un error de permisos
 * @param {Object} error - Error de Axios
 * @returns {boolean} true si es error 403
 */
export const isPermissionError = (error) => {
  return error.response?.status === 403;
};

/**
 * Verifica si es un error de red
 * @param {Object} error - Error de Axios
 * @returns {boolean} true si es error de red
 */
export const isNetworkError = (error) => {
  return error.request && !error.response;
};

// Exportar por defecto la función principal
export default errorHandler;