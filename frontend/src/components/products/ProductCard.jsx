// src/components/products/ProductCard.jsx
import { useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button, Chip } from "@nextui-org/react";
import { Heart, ShoppingCart, Star } from "lucide-react";

function ProductCard({ product }) {
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

  return (
    <Card className="card-hover" isPressable>
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
          className="absolute top-2 right-2 z-20"
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            size={18}
            className={isFavorite ? "fill-red-500 text-red-500" : ""}
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
      <CardFooter className="flex-col items-start gap-2 p-4">
        {/* Nombre */}
        <h4 className="text-md font-semibold line-clamp-2">
          {product.name}
        </h4>

        {/* Categoria */}
        <p className="text-xs text-brand-gray-500">
          {product.category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {renderStars(product.rating)}
          <span className="text-xs text-brand-gray-600 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Precios */}
        <div className="flex items-center gap-2 w-full">
          {product.discount > 0 ? (
            <>
              <span className="text-lg font-bold text-brand-blue">
                {formatPrice(finalPrice)}
              </span>
              <span className="text-sm text-brand-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-brand-blue">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Boton agregar al carrito */}
        <Button
          className="w-full bg-gradient-to-r from-brand-lime to-green-400 text-black font-semibold"
          startContent={<ShoppingCart size={18} />}
        >
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;