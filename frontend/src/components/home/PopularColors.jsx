// src/components/home/PopularColors.jsx
import { useState } from 'react';
import { Card, CardBody } from "@nextui-org/react";

function PopularColors() {
  const [hoveredColor, setHoveredColor] = useState(null);

  // Array de colores populares
  const popularColors = [
    { id: 1, name: "Midnight Black", color: "#1a1a1a" },
    { id: 2, name: "Ocean Blue", color: "#4A90E2" },
    { id: 3, name: "Lime Green", color: "#d4fc79" },
    { id: 4, name: "Sunset Orange", color: "#FF6B35" },
    { id: 5, name: "Rose Gold", color: "#FFB6C1" },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <Card className="shadow-card">
        <CardBody className="p-8">
          {/* Título */}
          <h2 className="text-2xl font-bold mb-8">
            Colores <span className="text-gradient">Populares</span>
          </h2>

          {/* Grid de colores */}
          <div className="grid grid-cols-5 gap-6">
            {popularColors.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col items-center gap-2 cursor-pointer"
                onMouseEnter={() => setHoveredColor(item.id)}
                onMouseLeave={() => setHoveredColor(null)}
              >
                {/* Círculo de color */}
                <div
                  className={`
                    w-20 h-20 rounded-full border-4 border-white shadow-lg
                    transition-all duration-300
                    ${hoveredColor === item.id ? 'scale-125 shadow-2xl' : 'scale-100'}
                  `}
                  style={{ backgroundColor: item.color }}
                />

                {/* Nombre del color (visible solo en hover) */}
                <p className={`
                  text-sm font-medium text-center transition-opacity duration-300
                  ${hoveredColor === item.id ? 'opacity-100' : 'opacity-0'}
                `}>
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          {/* Indicador del color seleccionado */}
          {hoveredColor && (
            <div className="mt-6 p-4 bg-brand-gray-50 rounded-lg text-center animate-fade-in">
              <p className="text-brand-gray-600">
                Color seleccionado: <span className="font-semibold">
                  {popularColors.find(c => c.id === hoveredColor)?.name}
                </span>
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </section>
  );
}

export default PopularColors;