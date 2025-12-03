// src/hooks/useLoading.js

import { useContext } from 'react';
import { LoadingContext } from '../context/LoadingContext';

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error(
      'useLoading debe ser usado dentro de un LoadingProvider.'
    );
  }

  return context;
};