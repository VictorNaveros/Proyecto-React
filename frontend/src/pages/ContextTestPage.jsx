// src/pages/ContextTestPage.jsx

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useNotification } from '../hooks/useNotification';
import { useLoading } from '../hooks/useLoading';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';

function ContextTestPage() {
  const { user, isAuthenticated } = useAuth();
  const { items, total, itemCount, addToCart, removeFromCart, clearCart } = useCart();
  const { success, error, warning, info } = useNotification();
  const { startLoading, stopLoading } = useLoading();

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  // Función para agregar producto de prueba
  const handleAddProduct = () => {
    if (!productName || !productPrice) {
      error('Por favor completa todos los campos');
      return;
    }

    const product = {
      id: Date.now().toString(),
      name: productName,
      price: parseFloat(productPrice),
      image: 'https://via.placeholder.com/150',
      quantity: 1
    };

    addToCart(product);
    success(`${productName} agregado al carrito`);
    setProductName('');
    setProductPrice('');
  };

  // Función para probar loading
  const testLoading = async () => {
    startLoading('Procesando pedido...');
    
    // Simular petición HTTP (3 segundos)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    stopLoading();
    success('Pedido procesado exitosamente');
  };

  // Función para probar notificaciones
  const testNotifications = () => {
    success('Operación exitosa');
    
    setTimeout(() => {
      error('Error de prueba');
    }, 500);
    
    setTimeout(() => {
      warning('Advertencia de prueba');
    }, 1000);
    
    setTimeout(() => {
      info('Información de prueba');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          🧪 Testing de Contexts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AuthContext */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">🔐 AuthContext</h2>
            </CardHeader>
            <CardBody className="space-y-2">
              <p>Autenticado: {isAuthenticated ? '✅ Sí' : '❌ No'}</p>
              <p>Usuario: {user ? user.fullName : 'Ninguno'}</p>
              <p>Email: {user ? user.email : 'N/A'}</p>
              <p>Role: {user ? user.role : 'N/A'}</p>
            </CardBody>
          </Card>

          {/* CartContext */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">🛒 CartContext</h2>
            </CardHeader>
            <CardBody className="space-y-2">
              <p>Items en carrito: {itemCount}</p>
              <p>Total: ${total.toLocaleString()}</p>
              <p>Productos: {items.length}</p>
              
              <div className="space-y-2 mt-4">
                <Input
                  label="Nombre del producto"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  size="sm"
                />
                <Input
                  label="Precio"
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  size="sm"
                />
                <Button 
                  color="primary" 
                  onPress={handleAddProduct}
                  className="w-full"
                >
                  Agregar al carrito
                </Button>
              </div>

              {items.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="font-bold">Productos en carrito:</p>
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ${item.price.toLocaleString()} x {item.quantity}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          removeFromCart(item.id);
                          success('Producto eliminado');
                        }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    color="danger"
                    variant="bordered"
                    onPress={() => {
                      clearCart();
                      warning('Carrito vaciado');
                    }}
                    className="w-full mt-2"
                  >
                    Vaciar carrito
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>

          {/* NotificationContext */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">🔔 NotificationContext</h2>
            </CardHeader>
            <CardBody className="space-y-2">
              <p>Prueba el sistema de notificaciones:</p>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  color="success" 
                  onPress={() => success('✅ Success toast')}
                >
                  Success
                </Button>
                <Button 
                  color="danger" 
                  onPress={() => error('❌ Error toast')}
                >
                  Error
                </Button>
                <Button 
                  color="warning" 
                  onPress={() => warning('⚠️ Warning toast')}
                >
                  Warning
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => info('ℹ️ Info toast')}
                >
                  Info
                </Button>
              </div>

              <Button
                color="secondary"
                variant="bordered"
                onPress={testNotifications}
                className="w-full mt-4"
              >
                Probar todas (secuencia)
              </Button>
            </CardBody>
          </Card>

          {/* LoadingContext */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">⏳ LoadingContext</h2>
            </CardHeader>
            <CardBody className="space-y-2">
              <p>Prueba el spinner global:</p>
              
              <Button
                color="primary"
                onPress={testLoading}
                className="w-full"
              >
                Simular carga (3 segundos)
              </Button>

              <Button
                color="primary"
                variant="bordered"
                onPress={() => {
                  startLoading('Guardando cambios...');
                  setTimeout(() => {
                    stopLoading();
                    success('Cambios guardados');
                  }, 2000);
                }}
                className="w-full"
              >
                Probar con mensaje custom
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ContextTestPage;