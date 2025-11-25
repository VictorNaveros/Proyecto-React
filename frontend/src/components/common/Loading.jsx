// src/components/common/Loading.jsx
import { Spinner } from "@nextui-org/react";

function Loading({ message = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Spinner size="lg" color="primary" />
      <p className="text-brand-gray-600">{message}</p>
    </div>
  );
}

export default Loading;