// src/hooks/useNotification.js

import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

/**
 * Custom Hook para usar el NotificationContext
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification debe ser usado dentro de un NotificationProvider.'
    );
  }

  return context;
};