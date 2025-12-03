// src/pages/Home.jsx
// 🏠 PÁGINA DE INICIO - LANDING PROFESIONAL
// Copia este código completo en: src/pages/Home.jsx

import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody } from '@nextui-org/react';
import { ShoppingBag, Zap, Shield, Truck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Emoji grande */}
          <div className="text-8xl mb-6">
            🏪
          </div>

          {/* Título principal */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            TechStore Pro
          </h1>

          {/* Subtítulo con gradiente */}
          <p className="text-2xl md:text-3xl mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              La mejor tecnología
            </span>
          </p>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Encuentra los mejores productos de tecnología con los mejores precios del mercado.
            Laptops, accesorios, audio y mucho más.
          </p>

          {/* Botones - Condicionales según autenticación */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Button
                  size="lg"
                  color="primary"
                  className="text-lg font-semibold px-8"
                  startContent={<ShoppingBag size={24} />}
                  onPress={() => navigate('/products')}
                >
                  Ver Productos
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  className="text-lg font-semibold px-8 border-gray-700 text-white hover:border-gray-600"
                  onPress={() => navigate('/dashboard')}
                >
                  Mi Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  color="primary"
                  className="text-lg font-semibold px-8"
                  onPress={() => navigate('/login')}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  className="text-lg font-semibold px-8 border-gray-700 text-white hover:border-gray-600"
                  onPress={() => navigate('/register')}
                >
                  Crear Cuenta
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Feature 1: Productos de calidad */}
          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-700/30">
            <CardBody className="p-6 text-center">
              <div className="p-4 bg-blue-500/20 rounded-full w-fit mx-auto mb-4">
                <Zap size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Productos de Calidad
              </h3>
              <p className="text-gray-400">
                Solo las mejores marcas y productos verificados para ti
              </p>
            </CardBody>
          </Card>

          {/* Feature 2: Compra segura */}
          <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 backdrop-blur-sm border border-green-700/30">
            <CardBody className="p-6 text-center">
              <div className="p-4 bg-green-500/20 rounded-full w-fit mx-auto mb-4">
                <Shield size={32} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Compra Segura
              </h3>
              <p className="text-gray-400">
                Protección en todas tus compras con garantía de satisfacción
              </p>
            </CardBody>
          </Card>

          {/* Feature 3: Envío rápido */}
          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-sm border border-purple-700/30">
            <CardBody className="p-6 text-center">
              <div className="p-4 bg-purple-500/20 rounded-full w-fit mx-auto mb-4">
                <Truck size={32} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Envío Rápido
              </h3>
              <p className="text-gray-400">
                Recibe tus productos en tiempo récord a cualquier parte del país
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* CTA Final */}
      {!isAuthenticated && (
        <div className="container mx-auto px-4 py-16">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-700/50 max-w-3xl mx-auto">
            <CardBody className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Listo para comenzar?
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Crea tu cuenta gratis y descubre miles de productos increíbles
              </p>
              <Button
                size="lg"
                color="primary"
                className="text-lg font-semibold px-12"
                onPress={() => navigate('/register')}
              >
                Crear Cuenta Gratis
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Home;
