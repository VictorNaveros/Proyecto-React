// src/context/AuthContext.jsx

// ============================================
// IMPORTS
// ============================================
import { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

// ============================================
// CREAR EL CONTEXTO (WiFi Router 📡)
// ============================================
export const AuthContext = createContext();

// ============================================
// PROVIDER COMPONENT (El que instala el WiFi)
// ============================================
export const AuthProvider = ({ children }) => {
  // ------------------------------------
  // ESTADO DEL CONTEXTO
  // ------------------------------------
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ------------------------------------
  // FUNCIÓN: Verificar autenticación al cargar app
  // ------------------------------------
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      // Obtener token y user del localStorage
      const savedToken = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('auth_user');

      if (savedToken && savedUser) {
        // Si existen, restaurar la sesión
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      // Si hay error, limpiar todo
      logout();
    } finally {
      // Siempre marcar que terminó de cargar
      setIsLoading(false);
    }
  };

  // ------------------------------------
  // FUNCIÓN: LOGIN
  // ------------------------------------
  const login = async (email, password) => {
    try {
      setIsLoading(true);

      // Llamar al servicio de autenticación
      const response = await authService.login({ email, password });

      // Extraer datos de la respuesta
      const { token: newToken, user: newUser } = response;

      // Guardar en localStorage
      localStorage.setItem('auth_token', newToken);
      localStorage.setItem('auth_user', JSON.stringify(newUser));

      // Actualizar estado
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------
  // FUNCIÓN: REGISTER
  // ------------------------------------
  const register = async (userData) => {
    try {
      setIsLoading(true);

      // Llamar al servicio de registro
      const response = await authService.register(userData);

      // Extraer datos de la respuesta
      const { token: newToken, user: newUser } = response;

      // Guardar en localStorage
      localStorage.setItem('auth_token', newToken);
      localStorage.setItem('auth_user', JSON.stringify(newUser));

      // Actualizar estado
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Error en register:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al registrarse'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------
  // FUNCIÓN: LOGOUT
  // ------------------------------------
  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');

    // Limpiar estado
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // ------------------------------------
  // FUNCIÓN: Actualizar información del usuario
  // ------------------------------------
  const updateUser = (updatedUserData) => {
    try {
      // Actualizar usuario en estado
      const updatedUser = { ...user, ...updatedUserData };
      setUser(updatedUser);

      // Actualizar en localStorage
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));

      return { success: true };
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return { success: false };
    }
  };

  // ------------------------------------
  // VALUE: Todo lo que compartiremos (la señal WiFi)
  // ------------------------------------
  const value = {
    // Estado
    user,
    token,
    isAuthenticated,
    isLoading,
    
    // Funciones
    login,
    register,
    logout,
    updateUser,
    checkAuth
  };

  // ------------------------------------
  // RENDERIZAR EL PROVIDER
  // ------------------------------------
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};