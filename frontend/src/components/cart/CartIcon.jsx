// src/components/cart/CartIcon.jsx
import { Badge, Button } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";

function CartIcon({ itemCount = 0, onClick }) {
  return (
    <Badge 
      content={itemCount} 
      color="danger" 
      size="sm"
      isInvisible={itemCount === 0}
    >
      <Button 
        isIconOnly 
        variant="light" 
        aria-label="Carrito de compras"
        onPress={onClick}
      >
        <ShoppingCart size={22} />
      </Button>
    </Badge>
  );
}

export default CartIcon;