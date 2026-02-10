// src/components/products/ProductCard.jsx
// ✅ VERSIÓN CORREGIDA

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image, Button, Chip } from "@nextui-org/react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../hooks/useNotification';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { success } = useNotification();
  const [isFavorite, setIsFavorite] = useState(false);

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

  // Renderizar estrellas
  const renderStars = (rating) => {
    const stars = [];
    const ratingValue = typeof rating === 'object' ? rating.average : rating || 0;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= ratingValue ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  // Handlers
  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    success(`${product.name} agregado al carrito`);
  };

  return (
    <div onClick={handleViewDetails} className="cursor-pointer">
      <Card className="card-hover bg-gray-900/50 backdrop-blur-sm border border-gray-800">
        
        {/* Imagen del producto */}
        <CardBody className="overflow-visible p-0 relative">
          
          {/* Badge de descuento */}
          {product.discount > 0 && (
            <Chip
              color="danger"
              size="sm"
              className="absolute top-2 left-2 z-10"
            >
              -{product.discount}%
            </Chip>
          )}

          {/* Badge de destacado */}
          {product.featured && (
            <Chip
              color="warning"
              size="sm"
              className="absolute top-2 left-14 z-10"
            >
              ⭐ Destacado
            </Chip>
          )}

          {/* Botón favorito */}
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

          {/* ✅ IMAGEN CORREGIDA */}
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={product.name}
            className="w-full object-cover h-[240px]"
            src={
              product.mainImage || 
              product.images?.[0] || 
              "https://placehold.co/300x240/1a1a1a/666?text=Sin+Imagen"
            }
            fallbackSrc="https://placehold.co/300x240/1a1a1a/666?text=Error+Imagen"
          />
        </CardBody>

        {/* Información del producto */}
        <CardFooter className="flex-col items-start gap-3 p-4">
          
          {/* Nombre */}
          <h4 className="text-md font-semibold line-clamp-2 text-white">
            {product.name}
          </h4>

          {/* Categoría */}
          <p className="text-xs text-gray-400 capitalize">
            {product.category}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-400 ml-1">
              ({typeof product.rating === 'object' ? product.rating.count : product.reviews || 0})
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

          {/* Stock */}
          {product.quantity !== undefined && (
            <Chip
              size="sm"
              color={
                product.quantity > 10 
                  ? "success" 
                  : product.quantity > 0 
                    ? "warning" 
                    : "danger"
              }
              variant="flat"
            >
              {product.quantity > 0 ? `Stock: ${product.quantity}` : 'Agotado'}
            </Chip>
          )}

          {/* Botones */}
          <div className="flex gap-2 w-full">
            
            {/* Ver detalles */}
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

            {/* Agregar al carrito */}
            <Button
              size="sm"
              color="primary"
              className="flex-1"
              startContent={<ShoppingCart size={16} />}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              isDisabled={product.quantity === 0}
            >
              Agregar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// ✅ VALIDACIÓN:
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    mainImage: PropTypes.string,        // ← Documenta campo esperado
    images: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    brand: PropTypes.string,
    quantity: PropTypes.number,
    discount: PropTypes.number,
    featured: PropTypes.bool,
    rating: PropTypes.shape({
      average: PropTypes.number,
      count: PropTypes.number
    })
  }).isRequired
};

export default ProductCard;