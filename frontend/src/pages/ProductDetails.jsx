// src/pages/ProductDetails.jsx
// 📦 PÁGINA DE DETALLES DEL PRODUCTO - DISEÑO NEGRO PROFESIONAL
// Copia este código completo en: src/pages/ProductDetails.jsx

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Chip } from '@nextui-org/react';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../hooks/useCart';
import { useNotification } from '../hooks/useNotification';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { success, error } = useNotification();

  // Buscar el producto por ID
  const product = mockProducts.find(p => p.id === parseInt(id));

  // Estado para la cantidad
  const [quantity, setQuantity] = useState(1);

  // Si no existe el producto, mostrar error 404
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="max-w-md mx-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800">
          <CardBody className="text-center p-8">
            <p className="text-6xl mb-4">❌</p>
            <h2 className="text-2xl font-bold text-white mb-2">
              Producto no encontrado
            </h2>
            <p className="text-gray-400 mb-6">
              El producto con ID "{id}" no existe
            </p>
            <Button
              color="primary"
              onPress={() => navigate('/products')}
              startContent={<ArrowLeft size={18} />}
            >
              Volver a productos
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Calcular precio con descuento
  const finalPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Handlers de cantidad
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handler: Agregar al carrito
  const handleAddToCart = () => {
    if (quantity > product.stock) {
      error(`Solo hay ${product.stock} unidades disponibles`);
      return;
    }

    // Agregar al carrito con cantidad
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    success(`${quantity} x ${product.name} agregado al carrito`);
    setQuantity(1); // Resetear cantidad
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Botón volver */}
        <Button
          variant="light"
          className="mb-6 text-gray-400 hover:text-white"
          startContent={<ArrowLeft size={18} />}
          onPress={() => navigate('/products')}
        >
          Volver a productos
        </Button>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna 1: Imagen */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <CardBody className="p-8 flex items-center justify-center">
              <img
                src={product.image || "https://via.placeholder.com/500"}
                alt={product.name}
                className="w-full max-w-md object-contain rounded-lg"
              />
            </CardBody>
          </Card>

          {/* Columna 2: Información */}
          <div className="space-y-6">
            {/* Card de información principal */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <CardBody className="p-6 space-y-4">
                {/* Marca */}
                {product.brand && (
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    {product.brand}
                  </p>
                )}

                {/* Nombre */}
                <h1 className="text-3xl font-bold text-white">
                  {product.name}
                </h1>

                {/* Categoría */}
                <p className="text-gray-400">
                  Categoría: <span className="text-primary">{product.category}</span>
                </p>

                {/* Rating y reviews */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < product.rating ? "text-yellow-400" : "text-gray-600"}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    ({product.reviews} reseñas)
                  </span>
                </div>

                {/* Precio */}
                <div className="flex items-center gap-3">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-4xl font-bold text-primary">
                        {formatPrice(finalPrice)}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <Chip color="danger" size="sm">
                        -{product.discount}% OFF
                      </Chip>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Descripción */}
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>

                {/* Stock */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Stock disponible:</span>
                  <Chip
                    color={product.stock > 10 ? "success" : "warning"}
                    variant="flat"
                    size="sm"
                  >
                    {product.stock} unidades
                  </Chip>
                </div>

                {/* Selector de cantidad */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Cantidad:</label>
                  <div className="flex items-center gap-3">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="bordered"
                      className="border-gray-700"
                      onPress={decreaseQuantity}
                      isDisabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    
                    <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    
                    <Button
                      isIconOnly
                      size="sm"
                      variant="bordered"
                      className="border-gray-700"
                      onPress={increaseQuantity}
                      isDisabled={quantity >= product.stock}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Máximo: {product.stock} unidades
                  </p>
                </div>

                {/* Botón agregar al carrito */}
                <Button
                  color="primary"
                  size="lg"
                  className="w-full font-semibold"
                  startContent={<ShoppingCart size={20} />}
                  onPress={handleAddToCart}
                >
                  Agregar al carrito - {formatPrice(finalPrice * quantity)}
                </Button>
              </CardBody>
            </Card>

            {/* Card de especificaciones */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                <CardBody className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    📋 Especificaciones Técnicas
                  </h2>
                  <div className="space-y-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0"
                      >
                        <span className="text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-white font-semibold text-right">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
