// src/App.jsx
// VERSIÓN FINAL COMPLETA - Con todas las rutas configuradas

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';

// Páginas públicas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';

// Páginas protegidas
import Dashboard from './pages/Dashboard';

// Componentes globales
import NotificationContainer from './components/common/NotificationContainer';
import LoadingOverlay from './components/common/LoadingOverlay';

function App() {
  return (
    <BrowserRouter>
      <NotificationContainer />
      <LoadingOverlay />
      
      <Layout>
        <Routes>
          {/* ========================================
              RUTAS PÚBLICAS (NO REQUIEREN LOGIN)
          ======================================== */}
          
          {/* Home - Landing page */}
          <Route path="/" element={<Home />} />
          
          {/* Login - Iniciar sesión */}
          <Route path="/login" element={<Login />} />
          
          {/* Register - Crear cuenta */}
          <Route path="/register" element={<Register />} />
          
          {/* Products - Listado de productos (PÚBLICA) */}
          <Route path="/products" element={<ProductsPage />} />
          
          {/* Product Details - Detalle de producto (PÚBLICA) */}
          <Route path="/products/:id" element={<ProductDetails />} />
          
          {/* ========================================
              RUTAS PROTEGIDAS (REQUIEREN LOGIN)
          ======================================== */}
          
          {/* Dashboard - Panel de usuario (PROTEGIDA) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* ========================================
              RUTA 404 - NO ENCONTRADA
          ======================================== */}
          
          {/* Redirect a Home si la ruta no existe */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;