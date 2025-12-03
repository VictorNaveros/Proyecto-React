// src/pages/Dashboard.jsx
// 📊 DASHBOARD DEL USUARIO - DISEÑO NEGRO PROFESIONAL
// Copia este código completo en: src/pages/Dashboard.jsx

import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button } from '@nextui-org/react';
import { ShoppingCart, Package, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, getTotalItems, getTotalPrice } = useCart();

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Handler: Cerrar sesión
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">
              Bienvenido, <span className="text-primary font-semibold">{user?.fullName}</span>
            </p>
          </div>
          
          <Button
            color="danger"
            variant="flat"
            startContent={<LogOut size={18} />}
            onPress={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </div>

        {/* Grid de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Información del usuario */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm border border-blue-700/50">
            <CardBody className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <User size={24} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Usuario</p>
                  <h3 className="text-xl font-bold text-white">
                    {user?.fullName}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                Email: {user?.email}
              </p>
            </CardBody>
          </Card>

          {/* Card 2: Items en carrito */}
          <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm border border-green-700/50">
            <CardBody className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <ShoppingCart size={24} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Items en Carrito</p>
                  <h3 className="text-3xl font-bold text-white">
                    {getTotalItems()}
                  </h3>
                </div>
              </div>
              <Button
                size="sm"
                color="success"
                variant="flat"
                className="w-full"
                onPress={() => navigate('/products')}
              >
                Ver Productos
              </Button>
            </CardBody>
          </Card>

          {/* Card 3: Total a pagar */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm border border-purple-700/50">
            <CardBody className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Package size={24} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Carrito</p>
                  <h3 className="text-2xl font-bold text-white">
                    {formatPrice(getTotalPrice())}
                  </h3>
                </div>
              </div>
              <Button
                size="sm"
                color="secondary"
                variant="flat"
                className="w-full"
                isDisabled={cart.length === 0}
              >
                Procesar Compra
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Productos en el carrito */}
        <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              🛒 Productos en tu Carrito
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart size={64} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">
                  Tu carrito está vacío
                </p>
                <Button
                  color="primary"
                  onPress={() => navigate('/products')}
                >
                  Ir a Productos
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {item.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl text-gray-400">Total:</span>
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
