// src/routes/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Componente que protege rutas privadas
 * Si el usuario NO está autenticado, lo redirige a /login
 * 
 * Uso:
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Mientras verifica autenticación, mostrar mensaje
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-foreground-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Si NO está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar el contenido
  return children;
}

export default ProtectedRoute;