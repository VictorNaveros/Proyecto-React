// src/components/common/EmptyState.jsx
import { PackageX } from "lucide-react";

function EmptyState({ 
  icon: Icon = PackageX, 
  title = "No hay datos", 
  message = "No se encontraron resultados" 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
      <div className="w-20 h-20 rounded-full bg-brand-gray-100 flex items-center justify-center">
        <Icon size={40} className="text-brand-gray-400" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-brand-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
}

export default EmptyState;