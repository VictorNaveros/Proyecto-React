import { Button, Card, CardBody, CardFooter, Image, Badge } from '@nextui-org/react';

function App() {
  // Datos de ejemplo de productos
  const products = [
    {
      id: 1,
      name: "Laptop Gaming",
      price: "$1,299",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
      category: "Computadoras",
      stock: 5
    },
    {
      id: 2,
      name: "Mouse Inalámbrico",
      price: "$49",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
      category: "Accesorios",
      stock: 12
    },
    {
      id: 3,
      name: "Teclado Mecánico",
      price: "$159",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
      category: "Accesorios",
      stock: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Header / Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge content="Beta" color="warning" size="lg" className="mb-4">
            <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">
              🏪 TECHSTORE PRO
            </h1>
          </Badge>
          
          <p className="text-2xl text-white/90 mb-6 font-light">
            Tu tienda de tecnología desarrollada con React + Vite + NextUI
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              color="primary" 
              size="lg" 
              variant="shadow"
              className="font-semibold"
            >
              🛍️ Ver Productos
            </Button>
            
            <Button 
              color="success" 
              size="lg" 
              variant="shadow"
              className="font-semibold"
            >
              ✨ Ofertas Especiales
            </Button>
            
            <Button 
              color="secondary" 
              size="lg" 
              variant="shadow"
              className="font-semibold"
            >
              🔥 Lo Más Vendido
            </Button>
          </div>
        </div>

        {/* Sección de Productos */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            🎯 Productos Destacados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card 
                key={product.id}
                className="hover:scale-105 transition-transform duration-300"
              >
                <CardBody className="p-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover h-[200px]"
                  />
                  
                  <div className="p-4">
                    <Badge color="secondary" variant="flat" className="mb-2">
                      {product.category}
                    </Badge>
                    
                    <h3 className="text-xl font-bold mb-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">
                        {product.price}
                      </span>
                      <Badge color="success" variant="flat">
                        Stock: {product.stock}
                      </Badge>
                    </div>
                  </div>
                </CardBody>
                
                <CardFooter className="gap-2">
                  <Button 
                    color="primary" 
                    className="flex-1"
                    size="lg"
                  >
                    🛒 Agregar al Carrito
                  </Button>
                  <Button 
                    color="default" 
                    variant="flat"
                    isIconOnly
                    size="lg"
                  >
                    ❤️
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-white/80">
          <p className="text-lg">
            💻 Desarrollado con React 18 + Vite 5 + NextUI 2.4 + Tailwind CSS v3
          </p>
          <p className="text-sm mt-2">
            ⚡ Hot Module Replacement (HMR) Activo
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;