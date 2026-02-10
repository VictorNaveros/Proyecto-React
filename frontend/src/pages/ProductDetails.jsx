// src/pages/ProductDetails.jsx
// ✅ VERSIÓN NUEVA (con API real)

// ============================================
// IMPORTACIONES
// ============================================
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Chip } from '@nextui-org/react';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';

// Contexts
import { useCart } from '../hooks/useCart';
import { useNotification } from '../hooks/useNotification';

// Components
import Loading from '../components/common/Loading';

// ✅ NUEVO: Service para obtener producto por ID
import { getProductById } from '../services/productService';
// getProductById(id): Hace GET http://localhost:5000/api/products/:id

// ============================================
// COMPONENTE PRODUCTDETAILS
// ============================================
function ProductDetails() {
  
  // ==========================================
  // HOOKS
  // ==========================================
  
  const { id } = useParams();
  // useParams: Obtiene parámetros de la URL
  // Si la URL es: /products/123
  // Entonces: id = "123"
  
  const navigate = useNavigate();
  // Para navegar programáticamente
  
  const { addToCart } = useCart();
  // Para agregar productos al carrito
  
  const { success, error: showError } = useNotification();
  // Para mostrar notificaciones
  
  // ==========================================
  // ESTADOS
  // ==========================================
  
  // Estado 1: Producto actual
  const [product, setProduct] = useState(null);
  // null: Aún no se ha cargado
  // objeto: Producto cargado desde backend
  
  // Estado 2: Loading
  const [loading, setLoading] = useState(true);
  
  // Estado 3: Error
  const [loadError, setLoadError] = useState(null);
  
  // Estado 4: Cantidad a agregar
  const [quantity, setQuantity] = useState(1);
  
  // ==========================================
  // useEffect: CARGAR PRODUCTO AL MONTAR
  // ==========================================
  
  useEffect(() => {
    // Se ejecuta cada vez que cambia el ID
    
    console.log(`🔍 Cargando producto ID: ${id}`);
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setLoadError(null);
        
        console.log(`📡 Request: GET /api/products/${id}`);
        
        // ✅ Llamar al backend para obtener producto específico
        const response = await getProductById(id);
        // getProductById(id) hace: GET http://localhost:5000/api/products/:id
        // Devuelve: { success: true, data: { name: "...", price: ... } }
        
        console.log('✅ Producto recibido:', response);
        
        // Extraer producto
        const productData = response.data || response;
        
        // Guardar en estado
        setProduct(productData);
        
      } catch (err) {
        console.error('❌ Error al cargar producto:', err);
        
        // Si es error 404, producto no existe
        if (err.response?.status === 404) {
          setLoadError('Producto no encontrado');
        } else {
          setLoadError('Error al cargar el producto');
        }
        
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
    
  }, [id]); // 👈 Dependencia: Se ejecuta cuando cambia el ID
  //   ^^^^
  //   Si el usuario va de /products/123 a /products/456
  //   useEffect se ejecuta de nuevo
  
  // ==========================================
  // FUNCIONES
  // ==========================================
  
  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  // Aumentar cantidad
  const increaseQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };
  
  // Disminuir cantidad
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Agregar al carrito
  const handleAddToCart = () => {
    if (!product) return;
    
    // Verificar stock
    if (quantity > product.quantity) {
      showError(`Solo hay ${product.quantity} unidades disponibles`);
      return;
    }
    
    // Agregar N veces
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    success(`${quantity} x ${product.name} agregado al carrito`);
    setQuantity(1); // Reset cantidad
  };
  
  // ==========================================
  // RENDERS CONDICIONALES
  // ==========================================
  
  // Render 1: Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loading />
        <p className="text-white mt-4">Cargando producto...</p>
      </div>
    );
  }
  
  // Render 2: Error o producto no existe
  if (loadError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="max-w-md mx-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800">
          <CardBody className="text-center p-8">
            <p className="text-6xl mb-4">❌</p>
            <h2 className="text-2xl font-bold text-white mb-2">
              Producto no encontrado
            </h2>
            <p className="text-gray-400 mb-6">
              {loadError || `El producto con ID "${id}" no existe`}
            </p>
            <Button
              color="primary"
              onPress={() => navigate('/products')}
              startContent={<ArrowLeft size={18} />}
            >
              Volver a productos
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  // ==========================================
  // RENDER PRINCIPAL
  // ==========================================
  
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Botón volver */}
        <Button
          variant="light"
          className="mb-6 text-gray-400 hover:text-white"
          startContent={<ArrowLeft size={18} />}
          onPress={() => navigate('/products')}
        >
          Volver a productos
        </Button>
        
        {/* Grid: Imagen + Información */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Columna 1: Imagen */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <CardBody className="p-8 flex items-center justify-center">
              <img
                src={product.mainImage || product.images?.[0] || "https://placehold.co/500x500/1a1a1a/666?text=Sin+Imagen"}
                alt={product.name}
                className="w-full max-w-md object-contain rounded-lg"
              />
            </CardBody>
          </Card>
          
          {/* Columna 2: Información */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <CardBody className="p-6 space-y-4">
                
                {/* Marca */}
                {product.brand && (
                  <p className="text-sm text-gray-400 uppercase tracking-wide">
                    {product.brand}
                  </p>
                )}
                
                {/* Nombre */}
                <h1 className="text-3xl font-bold text-white">
                  {product.name}
                </h1>
                
                {/* Categoría */}
                <p className="text-gray-400">
                  Categoría: <span className="text-primary">{product.category}</span>
                </p>
                
                {/* Precio */}
                <div className="flex items-center gap-3">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-4xl font-bold text-primary">
                        {formatPrice(product.price * (1 - product.discount / 100))}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <Chip color="danger" size="sm">
                        -{product.discount}% OFF
                      </Chip>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                
                {/* Descripción */}
                <p className="text-gray-300 leading-relaxed">
                  {product.description || 'Sin descripción disponible'}
                </p>
                
                {/* Stock */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Stock disponible:</span>
                  <Chip
                    color={product.quantity > 10 ? "success" : "warning"}
                    variant="flat"
                    size="sm"
                  >
                    {product.quantity} unidades
                  </Chip>
                </div>
                
                {/* Selector de cantidad */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Cantidad:</label>
                  <div className="flex items-center gap-3">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="bordered"
                      className="border-gray-700"
                      onPress={decreaseQuantity}
                      isDisabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    
                    <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    
                    <Button
                      isIconOnly
                      size="sm"
                      variant="bordered"
                      className="border-gray-700"
                      onPress={increaseQuantity}
                      isDisabled={quantity >= product.quantity}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Máximo: {product.quantity} unidades
                  </p>
                </div>
                
                {/* Botón agregar al carrito */}
                <Button
                  color="primary"
                  size="lg"
                  className="w-full font-semibold"
                  startContent={<ShoppingCart size={20} />}
                  onPress={handleAddToCart}
                  isDisabled={!product.inStock || product.quantity === 0}
                >
                  {product.inStock 
                    ? `Agregar al carrito - ${formatPrice(product.price * quantity)}`
                    : 'Agotado'
                  }
                </Button>
                
              </CardBody>
            </Card>
            
            {/* Especificaciones (si existen) */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                <CardBody className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    📋 Especificaciones Técnicas
                  </h2>
                  <div className="space-y-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0"
                      >
                        <span className="text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-white font-semibold text-right">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;