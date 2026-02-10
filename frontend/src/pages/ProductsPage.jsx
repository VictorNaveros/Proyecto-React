// src/pages/ProductsPage.jsx

import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import ProductGrid from '../components/products/ProductGrid';
import SearchBar from '../components/products/SearchBar';
import Pagination from '../components/common/Pagination';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Cargar productos de la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        console.log('🔄 Cargando página:', currentPage);
        
        // Llamar a la API con página y límite
        const data = await getProducts(currentPage, 12);
        
        console.log('📦 Productos recibidos:', data);
        
        // Actualizar estados
        setProducts(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotal(data.total || 0);
        
      } catch (error) {
        console.error('❌ Error cargando productos:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // ← Se ejecuta cada vez que cambia la página

  // Manejar cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtrar productos según búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Nuestros <span className="text-gradient">Productos</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Encuentra la tecnología que necesitas
        </p>
      </div>

      {/* Barra de búsqueda */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Loading o productos */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-400 text-lg">Cargando productos...</p>
          </div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">
            {searchTerm 
              ? `No se encontraron productos con "${searchTerm}"`
              : 'No hay productos disponibles'
            }
          </p>
        </div>
      )}

      {/* Paginación */}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Info de resultados */}
      {!loading && products.length > 0 && (
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Página {currentPage} de {totalPages} • Total: {total} productos
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;