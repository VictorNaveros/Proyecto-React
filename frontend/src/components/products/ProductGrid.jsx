// src/components/products/ProductGrid.jsx
import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  // Validar que products sea un array
  if (!Array.isArray(products)) {
    console.error('ProductGrid: products debe ser un array');
    return null;
  }

  // Si no hay productos
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-brand-gray-600 text-lg">
          No se encontraron productos
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;