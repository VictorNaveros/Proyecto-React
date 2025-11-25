
// src/components/common/Input.jsx
import { Input as NextUIInput } from "@nextui-org/react";

function Input({ 
  label, 
  error, 
  ...props 
}) {
  return (
    <div className="w-full">
      <NextUIInput
        label={label}
        isInvalid={!!error}
        errorMessage={error}
        classNames={{
          input: "bg-white",
          inputWrapper: "border-2 border-brand-gray-200 hover:border-brand-blue"
        }}
        {...props}
      />
    </div>
  );
}

export default Input;