// src/components/cart/CartItem.jsx
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { Plus, Minus, Trash2 } from "lucide-react";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Calcular subtotal
  const subtotal = item.price * item.quantity;

  return (
    <Card className="mb-4">
      <CardBody>
        <div className="flex gap-4">
          {/* Imagen */}
          <Image
            src={item.image || "https://via.placeholder.com/100"}
            alt={item.name}
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />

          {/* Informacion */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Nombre */}
            <h4 className="text-md font-semibold">{item.name}</h4>

            {/* Precio unitario */}
            <p className="text-sm text-brand-gray-600">
              {formatPrice(item.price)}
            </p>

            {/* Controles de cantidad */}
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
                isDisabled={item.quantity === 1}
              >
                <Minus size={16} />
              </Button>

              <span className="w-8 text-center font-semibold">
                {item.quantity}
              </span>

              <Button
                isIconOnly
                size="sm"
                variant="flat"
                onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus size={16} />
              </Button>

              {/* Subtotal */}
              <span className="ml-auto text-lg font-bold text-brand-blue">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>

          {/* Boton eliminar */}
          <Button
            isIconOnly
            size="sm"
            color="danger"
            variant="light"
            onPress={() => onRemove(item.id)}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default CartItem;