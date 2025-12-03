// src/context/NotificationContext.jsx

// ============================================
// IMPORTS
// ============================================
import { createContext, useState, useCallback } from 'react';

// ============================================
// CREAR EL CONTEXTO
// ============================================
const NotificationContext = createContext();

// ============================================
// PROVIDER COMPONENT
// ============================================
const NotificationProvider = ({ children }) => {
  // ------------------------------------
  // ESTADO DE NOTIFICACIONES
  // ------------------------------------
  const [notifications, setNotifications] = useState([]);

  // ------------------------------------
  // FUNCIÓN: Mostrar notificación
  // ------------------------------------
  const showNotification = useCallback((message, type = 'info', duration = 3000) => {
    // Crear nueva notificación con ID único
    const newNotification = {
      id: Date.now() + Math.random(), // ID único
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration
    };

    // Agregar notificación
    setNotifications(prev => {
      // Limitar a máximo 3 notificaciones
      const updated = [...prev, newNotification];
      return updated.slice(-3); // Solo últimas 3
    });

    // Auto-remover después de duration
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, duration);
  }, []);

  // ------------------------------------
  // FUNCIÓN: Remover notificación
  // ------------------------------------
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  // ------------------------------------
  // SHORTCUTS: Funciones específicas por tipo
  // ------------------------------------
  const success = useCallback((message, duration) => {
    showNotification(message, 'success', duration);
  }, [showNotification]);

  const error = useCallback((message, duration) => {
    showNotification(message, 'error', duration);
  }, [showNotification]);

  const warning = useCallback((message, duration) => {
    showNotification(message, 'warning', duration);
  }, [showNotification]);

  const info = useCallback((message, duration) => {
    showNotification(message, 'info', duration);
  }, [showNotification]);

  // ------------------------------------
  // VALUE
  // ------------------------------------
  const value = {
    notifications,
    showNotification,
    removeNotification,
    success,
    error,
    warning,
    info
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };