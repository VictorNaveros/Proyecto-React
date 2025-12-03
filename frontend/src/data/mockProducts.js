// src/components/data/mockProducts.js

export const mockProducts = [
  {
    id: 1,
    name: "Audífonos Bluetooth Premium",
    category: "Audio",
    price: 299000,
    discount: 15,
    rating: 5,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 15,
    brand: "Sony",
    description: "Audífonos inalámbricos con cancelación de ruido activa, batería de 30 horas y sonido Hi-Res. Perfectos para trabajo y entretenimiento. Comodidad premium con almohadillas de espuma viscoelástica.",
    specs: {
      connectivity: "Bluetooth 5.0",
      battery: "30 horas",
      noiseCancellation: "Activa (ANC)",
      weight: "250g",
      warranty: "1 año"
    }
  },
  {
    id: 2,
    name: "Teclado Mecánico RGB",
    category: "Accesorios",
    price: 450000,
    discount: 0,
    rating: 4,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    stock: 8,
    brand: "Logitech",
    description: "Teclado mecánico con switches Cherry MX Blue, iluminación RGB personalizable por tecla y reposamuñecas incluido. Ideal para gaming y productividad. Construcción en aluminio de alta calidad.",
    specs: {
      switches: "Cherry MX Blue",
      lighting: "RGB por tecla",
      connectivity: "USB-C desmontable",
      layout: "Español",
      warranty: "2 años"
    }
  },
  {
    id: 3,
    name: "Mouse Gaming Inalámbrico",
    category: "Accesorios",
    price: 180000,
    discount: 20,
    rating: 5,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    stock: 22,
    brand: "Razer",
    description: "Mouse gaming con sensor óptico de 16000 DPI, 7 botones programables y batería de 70 horas. Diseño ergonómico para sesiones largas de gaming. Compatible con Razer Synapse para personalización completa.",
    specs: {
      dpi: "16000 DPI",
      buttons: "7 programables",
      battery: "70 horas",
      connectivity: "Wireless 2.4GHz",
      warranty: "2 años"
    }
  },
  {
    id: 4,
    name: "Monitor 27\" 4K",
    category: "Monitores",
    price: 1200000,
    discount: 10,
    rating: 5,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    stock: 5,
    brand: "LG",
    description: "Monitor profesional 4K UHD con panel IPS de 27 pulgadas, cobertura de color 99% sRGB y calibración de fábrica. Perfecto para diseño gráfico, edición de video y gaming casual. Incluye soporte ajustable en altura.",
    specs: {
      size: "27 pulgadas",
      resolution: "3840x2160 (4K UHD)",
      panel: "IPS",
      refreshRate: "60Hz",
      ports: "HDMI 2.0, DisplayPort 1.4, USB-C"
    }
  },
  {
    id: 5,
    name: "Webcam Full HD 1080p",
    category: "Accesorios",
    price: 250000,
    discount: 0,
    rating: 4,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500",
    stock: 12,
    brand: "Logitech",
    description: "Webcam Full HD con enfoque automático, corrección automática de luz y micrófono estéreo integrado con reducción de ruido. Ideal para videollamadas profesionales, clases online y streaming. Compatible con todas las plataformas.",
    specs: {
      resolution: "1920x1080 Full HD",
      fps: "30 FPS",
      microphone: "Estéreo con reducción de ruido",
      mounting: "Clip universal ajustable",
      connection: "USB 2.0"
    }
  },
  {
    id: 6,
    name: "Silla Gamer Ergonómica",
    category: "Muebles",
    price: 850000,
    discount: 25,
    rating: 5,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500",
    stock: 7,
    brand: "DXRacer",
    description: "Silla gaming profesional con respaldo reclinable de 90° hasta 180°, cojines lumbar y cervical de espuma viscoelástica, apoyabrazos 4D completamente ajustables. Soporte de peso hasta 150kg. Ruedas silenciosas de nylon.",
    specs: {
      material: "Cuero PU premium",
      recline: "90° - 180°",
      weightCapacity: "150kg",
      armrests: "4D ajustables",
      warranty: "3 años"
    }
  },
  {
    id: 7,
    name: "Micrófono USB Profesional",
    category: "Audio",
    price: 320000,
    discount: 0,
    rating: 4,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500",
    stock: 18,
    brand: "Blue Yeti",
    description: "Micrófono condensador USB con 4 patrones de grabación seleccionables, controles integrados de ganancia y silencio, monitoreo sin latencia. Perfecto para podcasting, streaming, grabación de música y videollamadas profesionales.",
    specs: {
      type: "Condensador de diafragma grande",
      patterns: "Cardioide, Bidireccional, Omnidireccional, Estéreo",
      connection: "USB plug-and-play",
      compatibility: "PC, Mac, PS4/5",
      warranty: "2 años"
    }
  },
  {
    id: 8,
    name: "Laptop Stand Aluminio",
    category: "Accesorios",
    price: 120000,
    discount: 15,
    rating: 4,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    stock: 25,
    brand: "Rain Design",
    description: "Soporte elevador para laptop fabricado en aluminio anodizado de alta calidad. Mejora la postura al elevar la pantalla a la altura de los ojos y aumenta la ventilación del equipo. Diseño minimalista que complementa cualquier espacio de trabajo. Compatible con todas las laptops de 10 a 17 pulgadas.",
    specs: {
      material: "Aluminio anodizado",
      compatibility: "Laptops 10\" - 17\"",
      height: "Elevación de 15cm",
      weight: "800g",
      color: "Gris espacial"
    }
  }
];