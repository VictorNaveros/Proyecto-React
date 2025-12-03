// src/context/LoadingContext.jsx

import { createContext, useState } from 'react';

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Cargando...');

  const startLoading = (loadingMessage = 'Cargando...') => {
    setMessage(loadingMessage);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
    setMessage('Cargando...');
  };

  const value = {
    isLoading,
    message,
    startLoading,
    stopLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };