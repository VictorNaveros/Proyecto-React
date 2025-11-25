// src/pages/ProductsPage.jsx
import { useState } from 'react';
import SearchBar from '../components/products/SearchBar';
import ProductGrid from '../components/products/ProductGrid';
import { mockProducts } from '../data/mockProducts';

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar productos según búsqueda
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Titulo */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Nuestros <span className="text-gradient">Productos</span>
        </h1>
        <p className="text-brand-gray-600 text-lg">
          Encuentra la tecnología que necesitas
        </p>
      </div>

      {/* Barra de busqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Grid de productos */}
      <ProductGrid products={filteredProducts} />

      {/* Contador de resultados */}
      <div className="text-center mt-8">
        <p className="text-brand-gray-600">
          Mostrando {filteredProducts.length} de {mockProducts.length} productos
        </p>
      </div>
    </div>
  );
}

export default ProductsPage;