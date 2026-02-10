// src/pages/Home.jsx
// CORREGIDO: 
// - Botón "Ver Productos" del CTA ahora es público (sin protección)
// - Ya no redirige a login innecesariamente

import { Button, Card, CardBody } from "@nextui-org/react";
import { ShoppingBag, Zap, Shield, Truck } from "lucide-react";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/home/Hero';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section del NIVEL 1 */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            ¿Por qué elegir TechStore Pro?
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            La mejor experiencia de compra en tecnología con garantía de calidad
          </p>

          {/* Grid de Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Calidad */}
            <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/30">
              <CardBody className="text-center py-10">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-blue-500/20">
                    <Zap className="text-blue-400" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Productos de Calidad
                </h3>
                <p className="text-gray-400">
                  Selección curada de las mejores marcas del mercado
                </p>
              </CardBody>
            </Card>

            {/* Feature 2: Seguridad */}
            <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/30">
              <CardBody className="text-center py-10">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-green-500/20">
                    <Shield className="text-green-400" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Compra Segura
                </h3>
                <p className="text-gray-400">
                  Transacciones protegidas y garantía de satisfacción
                </p>
              </CardBody>
            </Card>

            {/* Feature 3: Envío */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/30">
              <CardBody className="text-center py-10">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-purple-500/20">
                    <Truck className="text-purple-400" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Envío Rápido
                </h3>
                <p className="text-gray-400">
                  Entrega en 24-48 horas en todo el país
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - CORREGIDO */}
      {!isAuthenticated && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30">
              <CardBody className="text-center py-16">
                <h2 className="text-4xl font-bold mb-4 text-white">
                  ¿Listo para comenzar?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Crea tu cuenta gratis para poder comprar
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button
                    size="lg"
                    color="primary"
                    onClick={() => navigate('/register')}
                    startContent={<ShoppingBag size={20} />}
                  >
                    Crear Cuenta Gratis
                  </Button>
                  {/* BOTÓN "Ver Productos" removido - Hero ya lo tiene */}
                </div>
              </CardBody>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}