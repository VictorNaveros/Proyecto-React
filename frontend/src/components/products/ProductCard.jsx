// src/components/products/ProductCard.jsx
// 🛍️ CARD DE PRODUCTO - ACTUALIZADO CON CART + NOTIFICATIONS
// Copia este código completo en: src/components/products/ProductCard.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image, Button, Chip } from "@nextui-org/react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../hooks/useNotification';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { success } = useNotification();
  const [isFavorite, setIsFavorite] = useState(false);

  // Calcular precio con descuento si existe
  const finalPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  // Formatear precio a pesos colombianos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Renderizar estrellas de rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  // Handler: Ver detalles del producto
  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  // Handler: Agregar al carrito
  const handleAddToCart = () => {
    addToCart(product);
    success(`${product.name} agregado al carrito`);
  };

  return (
    <div onClick={handleViewDetails} className="cursor-pointer">
      <Card className="card-hover bg-gray-900/50 backdrop-blur-sm border border-gray-800">
        {/* Imagen del producto */}
        <CardBody className="overflow-visible p-0 relative">
        {/* Badge de descuento (si existe) */}
        {product.discount > 0 && (
          <Chip
            color="danger"
            size="sm"
            className="absolute top-2 left-2 z-10"
          >
            -{product.discount}%
          </Chip>
        )}

        {/* Boton de favorito */}
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          className="absolute top-2 right-2 z-20 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart
            size={18}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-white"}
          />
        </Button>

        {/* Imagen */}
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="w-full object-cover h-[240px]"
          src={product.image || "https://via.placeholder.com/300x240"}
        />
      </CardBody>

      {/* Informacion del producto */}
      <CardFooter className="flex-col items-start gap-3 p-4">
        {/* Nombre */}
        <h4 className="text-md font-semibold line-clamp-2 text-white">
          {product.name}
        </h4>

        {/* Categoria */}
        <p className="text-xs text-gray-400">
          {product.category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-400 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Precios */}
        <div className="flex items-center gap-2 w-full">
          {product.discount > 0 ? (
            <>
              <span className="text-lg font-bold text-primary">
                {formatPrice(finalPrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Botones - Nuevo diseño con dos botones */}
        <div className="flex gap-2 w-full">
          {/* Botón Ver detalles */}
          <Button
            size="sm"
            variant="bordered"
            className="flex-1 border-gray-700 text-white hover:border-gray-600"
            startContent={<Eye size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            Ver detalles
          </Button>

          {/* Botón Agregar al carrito */}
          <Button
            size="sm"
            color="primary"
            className="flex-1"
            startContent={<ShoppingCart size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            Agregar
          </Button>
        </div>
      </CardFooter>
    </Card>
    </div>
  );
}

export default ProductCard;
