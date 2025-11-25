// src/components/home/Hero.jsx
import { Button, Chip } from "@nextui-org/react";
import { ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";

function Hero() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* COLUMNA IZQUIERDA: Contenido de texto */}
        <div className="space-y-6">
          {/* Badge decorativo */}
          <Chip 
            color="success" 
            variant="flat"
            className="mb-4"
          >
            Music is Classic
          </Chip>

          {/* Título principal */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Discover the{" "}
            <span className="bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-transparent">
              Best
            </span>{" "}
            Audio Experience
          </h1>

          {/* Número decorativo grande */}
          <div className="text-[200px] font-bold text-brand-gray-100 leading-none select-none">
            01
          </div>

          {/* Descripción */}
          <p className="text-brand-gray-600 text-lg max-w-md">
            Explora nuestra colección de audífonos premium con tecnología de 
            cancelación de ruido y sonido envolvente 3D.
          </p>

          {/* Botón de acción */}
          <Button 
            size="lg"
            className="bg-gradient-to-r from-brand-lime to-green-400 text-black font-semibold"
            endContent={<ArrowRight size={20} />}
          >
            Ver Productos
          </Button>
        </div>

        {/* COLUMNA DERECHA: Imagen del producto */}
        <div className="relative">
          {/* Gradiente de fondo blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30"></div>
          
          {/* Contenedor de imagen */}
          <div className="relative z-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-12 shadow-2xl">
            {/* Placeholder de imagen - Luego reemplazar con imagen real */}
            <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <p className="text-white text-xl font-semibold">
               <img src="https://resources.claroshop.com/medios-plazavip/mkt/60b8365c646d0_h269cf8c4354d41d5bbfd89a0ce60d34cljpg.jpg" alt="" />
              </p>
            </div>
          </div>

          {/* Iconos de redes sociales flotantes */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Instagram size={20} className="text-brand-gray-700" />
            </button>
            <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Facebook size={20} className="text-brand-gray-700" />
            </button>
            <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Twitter size={20} className="text-brand-gray-700" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;