// src/components/products/SearchBar.jsx
import { useState } from 'react';
import { Input } from "@nextui-org/react";
import { Search, X } from "lucide-react";

function SearchBar({ onSearch, placeholder = "Buscar productos..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Manejar cambio en el input
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Llamar función del padre con el nuevo valor
  };

  // Limpiar búsqueda
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  // Manejar Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <Input
        isClearable
        size="lg"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onClear={handleClear}
        onKeyPress={handleKeyPress}
        startContent={<Search size={20} className="text-brand-gray-400" />}
        classNames={{
          base: "max-w-full",
          input: "text-base",
          inputWrapper: "h-14 bg-white shadow-md hover:shadow-lg transition-shadow"
        }}
      />

      {/* Indicador de resultados */}
      {searchTerm && (
        <p className="text-sm text-brand-gray-600 mt-2">
          Buscando: <span className="font-semibold">{searchTerm}</span>
        </p>
      )}
    </div>
  );
}

export default SearchBar;