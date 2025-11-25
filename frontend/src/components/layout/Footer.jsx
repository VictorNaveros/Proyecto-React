// src/components/layout/Footer.jsx
import { Link } from "@nextui-org/react";

function Footer() {
  // Obtener año actual dinámicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLUMNA 1: Logo y descripción */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-lime to-brand-blue bg-clip-text text-transparent">
              TechStore
            </h3>
            <p className="text-brand-gray-400 text-sm">
              Tu tienda de tecnología y accesorios de confianza.
              Productos de calidad al mejor precio.
            </p>
          </div>

          {/* COLUMNA 2: Links rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <div className="flex flex-col space-y-2">
              <Link href="#" className="text-brand-gray-400 hover:text-brand-lime transition-colors">
                Sobre Nosotros
              </Link>
              <Link href="#" className="text-brand-gray-400 hover:text-brand-lime transition-colors">
                Productos
              </Link>
              <Link href="#" className="text-brand-gray-400 hover:text-brand-lime transition-colors">
                Ofertas
              </Link>
              <Link href="#" className="text-brand-gray-400 hover:text-brand-lime transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          {/* COLUMNA 3: Información legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Información</h4>
            <div className="flex flex-col space-y-2">
              <Link href="#" className="text-brand-gray-400 hover:text-brand-lime transition-colors">
                Políticas de Privacidad
              </Link>
              <Link href="#" className="text-brand-gray-400 hover:text-brand-lime transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="#" className="text-brand-gray-400 hover:text-brand-lime transition-colors">
                Política de Devoluciones
              </Link>
              <Link href="#" className="text-brand-gray-400 hover:text-brand-lime transition-colors">
                Preguntas Frecuentes
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-brand-gray-800 text-center">
          <p className="text-brand-gray-400 text-sm">
            © {currentYear} TechStore. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;