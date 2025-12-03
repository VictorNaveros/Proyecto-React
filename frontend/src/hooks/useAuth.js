// src/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom Hook para usar el AuthContext
 * 
 * ¿Para qué sirve?
 * - Simplifica el uso de AuthContext en componentes
 * - Valida que se use dentro del AuthProvider
 * 
 * Ejemplo de uso:
 * const { user, login, logout } = useAuth();
 */
export const useAuth = () => {
  // Obtener el contexto
  const context = useContext(AuthContext);

  // Validar que el contexto existe
  if (!context) {
    throw new Error(
      'useAuth debe ser usado dentro de un AuthProvider. ' +
      'Asegúrate de envolver tu componente con <AuthProvider>.'
    );
  }

  // Retornar el contexto
  return context;
};