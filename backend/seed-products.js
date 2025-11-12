// =============================================
// SCRIPT DE SEEDING - PRODUCTOS TECHSTORE PRO
// =============================================
// Este script llena la base de datos con productos de ejemplo
// Ejecutar: node seed-products.js

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

console.log('🌱 Iniciando seeding de productos TechStore Pro...');

// =============================================
// PRODUCTOS DE EJEMPLO - TECHSTORE PRO
// =============================================

const productos = [
    // LAPTOPS
    {
        name: "MacBook Pro 14\" M3",
        description: "Laptop profesional con chip M3 de Apple, 16GB RAM, 512GB SSD. Pantalla Liquid Retina XDR de 14.2 pulgadas. Perfecta para diseño, edición de video y programación.",
        price: 8999000,
        category: "laptops",
        brand: "Apple",
        stock: 15,
        mainImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800"
        ],
        specs: {
            processor: "Apple M3",
            ram: "16GB",
            storage: "512GB SSD",
            screen: "14.2\" Liquid Retina XDR",
            graphics: "GPU 10 núcleos integrada"
        },
        featured: true
    },
    {
        name: "MacBook Air 13\" M2",
        description: "Laptop ultradelgada con chip M2, 8GB RAM, 256GB SSD. Diseño ligero y portátil. Ideal para estudiantes y profesionales.",
        price: 5499000,
        category: "laptops",
        brand: "Apple",
        stock: 25,
        mainImage: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800",
        images: [
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800"
        ],
        specs: {
            processor: "Apple M2",
            ram: "8GB",
            storage: "256GB SSD",
            screen: "13.6\" Liquid Retina",
            graphics: "GPU 8 núcleos integrada"
        },
        featured: true
    },
    {
        name: "Dell XPS 15",
        description: "Laptop de alto rendimiento con Intel Core i7, 16GB RAM, 512GB SSD. Pantalla OLED 4K táctil de 15.6 pulgadas.",
        price: 7299000,
        category: "laptops",
        brand: "Dell",
        stock: 12,
        mainImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",
        images: [
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800"
        ],
        specs: {
            processor: "Intel Core i7-13700H",
            ram: "16GB DDR5",
            storage: "512GB NVMe SSD",
            screen: "15.6\" OLED 4K táctil",
            graphics: "NVIDIA RTX 4050 6GB"
        },
        featured: false
    },
    {
        name: "Lenovo ThinkPad X1 Carbon",
        description: "Laptop empresarial ultraligera con Intel Core i5, 16GB RAM, 512GB SSD. Perfecta para profesionales en movimiento.",
        price: 6499000,
        category: "laptops",
        brand: "Lenovo",
        stock: 18,
        mainImage: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
        images: [
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800"
        ],
        specs: {
            processor: "Intel Core i5-1335U",
            ram: "16GB LPDDR5",
            storage: "512GB NVMe SSD",
            screen: "14\" FHD+ IPS",
            graphics: "Intel Iris Xe"
        },
        featured: false
    },

    // SMARTPHONES
    {
        name: "iPhone 15 Pro Max 256GB",
        description: "Smartphone premium con chip A17 Pro, cámara de 48MP, pantalla Super Retina XDR de 6.7 pulgadas. Disponible en titanio natural.",
        price: 5499000,
        category: "smartphones",
        brand: "Apple",
        stock: 30,
        mainImage: "https://images.unsplash.com/photo-1592286927505-4fbdeab58f40?w=800",
        images: [
            "https://images.unsplash.com/photo-1592286927505-4fbdeab58f40?w=800"
        ],
        specs: {
            processor: "A17 Pro",
            ram: "8GB",
            storage: "256GB",
            screen: "6.7\" Super Retina XDR",
            camera: "48MP principal + 12MP ultra angular + 12MP telefoto"
        },
        featured: true
    },
    {
        name: "iPhone 15 128GB",
        description: "iPhone estándar con chip A16 Bionic, Dynamic Island, cámara dual de 48MP. Colores vibrantes disponibles.",
        price: 3999000,
        category: "smartphones",
        brand: "Apple",
        stock: 40,
        mainImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
        images: [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
        ],
        specs: {
            processor: "A16 Bionic",
            ram: "6GB",
            storage: "128GB",
            screen: "6.1\" Super Retina XDR",
            camera: "48MP principal + 12MP ultra angular"
        },
        featured: false
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        description: "Smartphone Android premium con S Pen, cámara de 200MP, pantalla Dynamic AMOLED 2X de 6.8 pulgadas.",
        price: 5299000,
        category: "smartphones",
        brand: "Samsung",
        stock: 22,
        mainImage: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
        images: [
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800"
        ],
        specs: {
            processor: "Snapdragon 8 Gen 3",
            ram: "12GB",
            storage: "256GB",
            screen: "6.8\" Dynamic AMOLED 2X",
            camera: "200MP principal + 50MP telefoto + 12MP ultra angular"
        },
        featured: true
    },

    // TABLETS
    {
        name: "iPad Pro 12.9\" M2",
        description: "Tablet profesional con chip M2, pantalla Liquid Retina XDR, compatible con Apple Pencil y Magic Keyboard.",
        price: 5999000,
        category: "tablets",
        brand: "Apple",
        stock: 15,
        mainImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
        images: [
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800"
        ],
        specs: {
            processor: "Apple M2",
            ram: "8GB",
            storage: "256GB",
            screen: "12.9\" Liquid Retina XDR",
            connectivity: "Wi-Fi 6E + 5G"
        },
        featured: true
    },
    {
        name: "iPad Air 10.9\" M1",
        description: "Tablet versátil con chip M1, ideal para creativos. Compatible con Apple Pencil 2 y Magic Keyboard.",
        price: 3499000,
        category: "tablets",
        brand: "Apple",
        stock: 20,
        mainImage: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800",
        images: [
            "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800"
        ],
        specs: {
            processor: "Apple M1",
            ram: "8GB",
            storage: "64GB",
            screen: "10.9\" Liquid Retina",
            connectivity: "Wi-Fi 6"
        },
        featured: false
    },
    {
        name: "Samsung Galaxy Tab S9",
        description: "Tablet Android premium con S Pen incluido, pantalla Dynamic AMOLED 2X, resistente al agua IP68.",
        price: 3299000,
        category: "tablets",
        brand: "Samsung",
        stock: 18,
        mainImage: "https://images.unsplash.com/photo-1585789575313-5f1cf8162c1c?w=800",
        images: [
            "https://images.unsplash.com/photo-1585789575313-5f1cf8162c1c?w=800"
        ],
        specs: {
            processor: "Snapdragon 8 Gen 2",
            ram: "8GB",
            storage: "128GB",
            screen: "11\" Dynamic AMOLED 2X",
            connectivity: "Wi-Fi 6E"
        },
        featured: false
    },

    // AURICULARES
    {
        name: "AirPods Pro 2",
        description: "Auriculares inalámbricos con cancelación activa de ruido, audio espacial personalizado, resistentes al agua IPX4.",
        price: 1299000,
        category: "audio",
        brand: "Apple",
        stock: 50,
        mainImage: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800",
        images: [
            "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800"
        ],
        specs: {
            connectivity: "Bluetooth 5.3",
            battery: "Hasta 6h con ANC",
            features: "Cancelación activa de ruido, Audio Espacial",
            charging: "USB-C, MagSafe, Qi"
        },
        featured: true
    },
    {
        name: "AirPods Max",
        description: "Auriculares over-ear premium con cancelación activa de ruido, audio espacial, diseño en aluminio.",
        price: 2599000,
        category: "audio",
        brand: "Apple",
        stock: 10,
        mainImage: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
        images: [
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800"
        ],
        specs: {
            connectivity: "Bluetooth 5.0",
            battery: "Hasta 20h con ANC",
            features: "Cancelación activa de ruido, Audio Espacial",
            design: "Aluminio anodizado, almohadillas memory foam"
        },
        featured: false
    },
    {
        name: "Sony WH-1000XM5",
        description: "Auriculares over-ear con la mejor cancelación de ruido del mercado, 30 horas de batería.",
        price: 1599000,
        category: "audio",
        brand: "Sony",
        stock: 25,
        mainImage: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800",
        images: [
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800"
        ],
        specs: {
            connectivity: "Bluetooth 5.2, LDAC",
            battery: "Hasta 30h con ANC",
            features: "Cancelación de ruido HD, Multi-point",
            design: "Plegable, estuche incluido"
        },
        featured: true
    },

    // SMARTWATCHES
    {
        name: "Apple Watch Series 9 45mm",
        description: "Smartwatch con chip S9, pantalla Always-On Retina, monitoreo avanzado de salud, GPS integrado.",
        price: 2199000,
        category: "wearables",
        brand: "Apple",
        stock: 28,
        mainImage: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
        images: [
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800"
        ],
        specs: {
            processor: "Apple S9",
            display: "1.9\" Always-On Retina",
            battery: "Hasta 18h",
            features: "ECG, Oxígeno en sangre, GPS, Celular"
        },
        featured: true
    },
    {
        name: "Apple Watch SE 40mm",
        description: "Smartwatch accesible con funciones esenciales, monitor de frecuencia cardíaca, resistente al agua.",
        price: 1299000,
        category: "wearables",
        brand: "Apple",
        stock: 35,
        mainImage: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800",
        images: [
            "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800"
        ],
        specs: {
            processor: "Apple S8",
            display: "1.57\" Retina",
            battery: "Hasta 18h",
            features: "Frecuencia cardíaca, GPS, Resistente al agua"
        },
        featured: false
    }
];

// =============================================
// FUNCIÓN PRINCIPAL DE SEEDING
// =============================================

const seedProducts = async () => {
    try {
        // CONECTAR A MONGODB
        console.log('📡 Conectando a MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conexión exitosa a MongoDB');

        // LIMPIAR COLECCIÓN DE PRODUCTOS (OPCIONAL)
        console.log('🗑️  Limpiando productos existentes...');
        await Product.deleteMany({});
        console.log('✅ Productos existentes eliminados');

        // INSERTAR PRODUCTOS
        console.log('🌱 Insertando productos de ejemplo...');
        const productosInsertados = await Product.insertMany(productos);
        
        console.log('\n✅ SEEDING COMPLETADO EXITOSAMENTE! 🎉\n');
        console.log(`📦 Total de productos insertados: ${productosInsertados.length}`);
        console.log('\n📊 Resumen por categoría:');
        
        const categorias = {};
        productosInsertados.forEach(p => {
            categorias[p.category] = (categorias[p.category] || 0) + 1;
        });
        
        Object.entries(categorias).forEach(([cat, count]) => {
            console.log(`   ${cat}: ${count} productos`);
        });
        
        console.log('\n💰 Rango de precios:');
        const precios = productosInsertados.map(p => p.price);
        console.log(`   Mínimo: $${Math.min(...precios).toLocaleString('es-CO')}`);
        console.log(`   Máximo: $${Math.max(...precios).toLocaleString('es-CO')}`);
        console.log(`   Promedio: $${Math.round(precios.reduce((a,b) => a+b, 0) / precios.length).toLocaleString('es-CO')}`);
        
        console.log('\n🎯 Productos destacados:', productosInsertados.filter(p => p.featured).length);
        
        console.log('\n✅ Base de datos lista para usar!');
        console.log('🚀 Ahora puedes probar: GET http://localhost:5000/api/products\n');

    } catch (error) {
        console.error('❌ Error en seeding:', error.message);
        console.error(error);
    } finally {
        // CERRAR CONEXIÓN
        await mongoose.connection.close();
        console.log('🔌 Conexión a MongoDB cerrada');
        process.exit();
    }
};

// EJECUTAR SEEDING
seedProducts();