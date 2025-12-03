// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import App from './App.jsx';
import './index.css';

// Providers de Context API
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import { LoadingProvider } from './context/LoadingContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      {/* Main con Dark Mode activado */}
      <main className="dark text-foreground bg-background min-h-screen">
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>
              <LoadingProvider>
                <App />
              </LoadingProvider>
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </main>
    </NextUIProvider>
  </React.StrictMode>
);