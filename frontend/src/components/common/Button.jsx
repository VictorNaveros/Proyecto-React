// src/components/common/Button.jsx
import { Button as NextUIButton } from "@nextui-org/react";

function Button({ 
  children, 
  variant = "primary", 
  onClick, 
  isLoading = false,
  isDisabled = false,
  ...props 
}) {
  // Mapear variantes a clases
  const variantClasses = {
    primary: "bg-gradient-to-r from-brand-lime to-green-400 text-black font-semibold",
    secondary: "bg-brand-blue text-white font-semibold",
    outline: "border-2 border-brand-blue text-brand-blue font-semibold bg-transparent hover:bg-brand-blue hover:text-white"
  };

  return (
    <NextUIButton
      className={variantClasses[variant]}
      onPress={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
      {...props}
    >
      {children}
    </NextUIButton>
  );
}

export default Button;