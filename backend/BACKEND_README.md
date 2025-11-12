# 🟢 TECHSTORE PRO BACKEND - NODE.JS + EXPRESS + MONGODB

## 📋 INFORMACIÓN GENERAL

Este es el backend completo y funcional de TechStore Pro. **Ya está listo para usar**.

Los aprendices solo necesitan:
1. Clonar/copiar este backend
2. Instalar dependencias
3. Configurar variables de entorno
4. Iniciar el servidor
5. **Enfocarse 100% en crear el frontend con React**

---

## 🛠️ STACK TECNOLÓGICO

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 20.x | Runtime de JavaScript |
| Express | 4.x | Framework web |
| MongoDB Atlas | Cloud | Base de datos NoSQL |
| Mongoose | 8.x | ODM para MongoDB |
| JWT | 9.x | Autenticación |
| bcryptjs | 2.x | Encriptación de passwords |
| express-validator | 7.x | Validación de datos |
| Winston | 3.x | Logging |
| Morgan | 1.x | HTTP logging |
| Helmet | 7.x | Seguridad (headers) |
| cors | 2.x | CORS habilitado |

---

## 🚀 INSTALACIÓN RÁPIDA (5 MINUTOS)

### **PASO 1: Copiar Backend**

```bash
# Opción A: Clonar del repositorio
git clone https://github.com/instructor/techstore-backend.git
cd techstore-backend

# Opción B: Copiar carpeta del USB del instructor
# (Si el instructor te dio la carpeta en USB)
```

### **PASO 2: Instalar Dependencias**

```bash
npm install
```

**Esto instalará automáticamente:**
- express
- mongoose
- jsonwebtoken
- bcryptjs
- express-validator
- winston
- morgan
- helmet
- cors
- express-rate-limit
- express-mongo-sanitize
- xss-clean
- dotenv

**Tiempo estimado:** 2-3 minutos

### **PASO 3: Configurar Variables de Entorno**

Crear archivo `.env` en la raíz del backend:

```env
# MONGODB
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/techstore?retryWrites=true&w=majority

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_minimo_32_caracteres_aqui
JWT_EXPIRE=7d

# SERVIDOR
PORT=5000
NODE_ENV=development

# APP
APP_VERSION=1.0.0

# FRONTEND URL (para CORS en producción)
FRONTEND_URL=http://localhost:5173
```

**⚠️ IMPORTANTE:**
- Reemplazar `MONGODB_URI` con tu conexión de MongoDB Atlas
- Generar un `JWT_SECRET` seguro (mínimo 32 caracteres)
- El `PORT` por defecto es 5000

### **PASO 4: Iniciar Servidor**

```bash
# Modo desarrollo (con nodemon - auto-restart)
npm run dev

# O modo normal
npm start
```

**Deberías ver:**
```
🚀 Iniciando TechStore Pro Backend...
🛡️  Helmet activado - Headers de seguridad configurados
📊 Morgan HTTP logging activado
✅ CORS configurado
🟢 Servidor corriendo en puerto 5000
📡 MongoDB conectado exitosamente
✅ Rutas API configuradas:
   📱 /api/products - Gestión de productos
   🔐 /api/auth - Autenticación y usuarios
   📦 /api/orders - Gestión de órdenes
   🥊 /api/health - Estado del servidor
```

### **PASO 5: Verificar que Funciona**

Abrir navegador en: `http://localhost:5000/api/health`

**Deberías ver:**
```json
{
  "success": true,
  "message": "TechStore Pro API funcionando correctamente",
  "status": "OK",
  "database": {
    "status": "connected",
    "name": "techstore"
  },
  "uptime": "5m 23s"
}
```

✅ **¡Listo! Backend funcionando** 🎉

---

## 📡 ENDPOINTS DISPONIBLES

### **🔐 AUTENTICACIÓN (`/api/auth`)**

| Método | Endpoint | Descripción | Auth Requerida |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Crear cuenta de usuario | No |
| POST | `/api/auth/login` | Iniciar sesión (obtener token) | No |
| GET | `/api/auth/profile` | Ver perfil del usuario | Sí |
| PUT | `/api/auth/profile` | Actualizar perfil | Sí |
| GET | `/api/auth/dashboard` | Estadísticas del usuario | Sí |

#### **Ejemplo: Register**
```javascript
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@example.com",
  "password": "Password123!",
  "phone": "3001234567"
}

// Respuesta:
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@example.com",
    "role": "customer"
  }
}
```

#### **Ejemplo: Login**
```javascript
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "juan.perez@example.com",
  "password": "Password123!"
}

// Respuesta:
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "Juan",
    "email": "juan.perez@example.com",
    "role": "customer"
  }
}
```

---

### **📱 PRODUCTOS (`/api/products`)**

| Método | Endpoint | Descripción | Auth Requerida |
|--------|----------|-------------|----------------|
| GET | `/api/products` | Lista de productos (con filtros) | No |
| GET | `/api/products/:id` | Detalle de un producto | No |
| POST | `/api/products` | Crear producto | Sí (Admin) |
| PUT | `/api/products/:id` | Actualizar producto | Sí (Admin) |
| DELETE | `/api/products/:id` | Eliminar producto | Sí (Admin) |
| GET | `/api/products/category/:category` | Productos por categoría | No |
| GET | `/api/products/brand/:brand` | Productos por marca | No |
| GET | `/api/products/search/:query` | Buscar productos | No |

#### **Ejemplo: Obtener Productos**
```javascript
GET http://localhost:5000/api/products

// Con filtros:
GET http://localhost:5000/api/products?category=laptops&minPrice=500000&maxPrice=2000000

// Respuesta:
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "MacBook Pro 14\" M3",
      "description": "Laptop profesional con chip M3...",
      "price": 8999000,
      "category": "laptops",
      "brand": "Apple",
      "stock": 15,
      "images": ["url1.jpg", "url2.jpg"],
      "rating": 4.8,
      "reviews": 234
    }
  ]
}
```

#### **Ejemplo: Crear Producto (Admin)**
```javascript
POST http://localhost:5000/api/products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "description": "El iPhone más avanzado",
  "price": 5499000,
  "originalPrice": 5999000,
  "category": "smartphones",
  "brand": "Apple",
  "stock": 50,
  "images": [
    "https://ejemplo.com/iphone15pro-1.jpg",
    "https://ejemplo.com/iphone15pro-2.jpg"
  ],
  "specifications": {
    "screen": "6.1 pulgadas OLED",
    "processor": "A17 Pro",
    "ram": "8GB",
    "storage": "256GB"
  }
}
```

---

### **📦 ÓRDENES (`/api/orders`)**

| Método | Endpoint | Descripción | Auth Requerida |
|--------|----------|-------------|----------------|
| POST | `/api/orders` | Crear orden (checkout) | Sí (Usuario) |
| GET | `/api/orders/myorders` | Órdenes del usuario | Sí (Usuario) |
| GET | `/api/orders/:id` | Detalle de orden | Sí (Owner/Admin) |
| GET | `/api/orders` | Todas las órdenes | Sí (Admin) |
| PUT | `/api/orders/:id/status` | Actualizar estado | Sí (Admin) |
| DELETE | `/api/orders/:id` | Eliminar orden | Sí (Admin) |
| GET | `/api/orders/stats/dashboard` | Estadísticas | Sí (Admin) |

#### **Ejemplo: Crear Orden**
```javascript
POST http://localhost:5000/api/orders
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "items": [
    {
      "product": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "price": 1299000
    }
  ],
  "shippingAddress": {
    "street": "Calle 123 #45-67",
    "city": "Bogotá",
    "state": "Cundinamarca",
    "zipCode": "110111",
    "country": "Colombia"
  },
  "paymentMethod": "Tarjeta de Crédito",
  "itemsPrice": 2598000,
  "taxPrice": 493620,
  "shippingPrice": 0,
  "totalPrice": 3091620
}

// Respuesta:
{
  "success": true,
  "message": "Orden creada exitosamente",
  "data": {
    "_id": "607f1f77bcf86cd799439022",
    "orderNumber": "TS-2024-001234",
    "user": "507f1f77bcf86cd799439011",
    "items": [...],
    "status": "pending",
    "totalPrice": 3091620,
    "createdAt": "2024-11-10T12:00:00.000Z"
  }
}
```

---

### **👤 DASHBOARD ADMIN (`/api/admin`)**

| Método | Endpoint | Descripción | Auth Requerida |
|--------|----------|-------------|----------------|
| GET | `/api/admin/dashboard` | Estadísticas generales | Sí (Admin) |
| GET | `/api/admin/users` | Lista de usuarios | Sí (Admin) |

---

## 🔐 AUTENTICACIÓN CON JWT

### **Cómo Funciona:**

1. **Usuario hace login** → Recibe un token JWT
2. **Frontend guarda el token** (localStorage)
3. **Cada petición incluye el token** en el header

### **Ejemplo en Frontend (React):**

```javascript
// 1. Login y guardar token
const response = await axios.post('http://localhost:5000/api/auth/login', {
  email: 'user@example.com',
  password: 'password123'
});

const token = response.data.token;
localStorage.setItem('token', token);

// 2. Usar token en peticiones protegidas
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const profile = await axios.get('http://localhost:5000/api/auth/profile', config);
```

---

## 📂 ESTRUCTURA DE CARPETAS

```
backend/
├── config/                    # Configuraciones
│   ├── database.js           # Conexión MongoDB
│   ├── logger.js             # Winston logging
│   └── morganConfig.js       # HTTP logging
├── controllers/              # Lógica de negocio
│   ├── authController.js    # ✅ Autenticación
│   ├── productController.js # ✅ Productos
│   └── orderController.js   # ✅ Órdenes
├── middleware/               # Middlewares
│   ├── auth.js              # ✅ Verificación JWT
│   ├── errorHandler.js      # ✅ Manejo de errores
│   ├── rateLimiter.js       # ✅ Rate limiting
│   ├── sanitize.js          # ✅ Sanitización
│   └── validation.js        # ✅ Validación
├── models/                   # Modelos de datos
│   ├── User.js              # ✅ Usuario
│   ├── Product.js           # ✅ Producto
│   └── Order.js             # ✅ Orden
├── routes/                   # Rutas de la API
│   ├── auth.js              # ✅ /api/auth
│   ├── products.js          # ✅ /api/products
│   ├── orders.js            # ✅ /api/orders
│   └── admin.js             # ✅ /api/admin
├── validators/               # Validaciones
│   ├── authValidators.js    # ✅ Auth validations
│   ├── productValidators.js # ✅ Product validations
│   └── orderValidators.js   # ✅ Order validations (NUEVO)
├── logs/                     # Logs automáticos
├── .env                      # Variables de entorno
├── .gitignore
├── app.js                    # ✅ Configuración Express
├── server.js                 # ✅ Inicio del servidor
├── package.json
└── README.md                 # Este archivo
```

---

## 🧪 TESTING CON THUNDER CLIENT (VS CODE)

### **Instalar Thunder Client:**
1. Abrir VS Code
2. Extensions → Buscar "Thunder Client"
3. Instalar

### **Colección de Pruebas:**

El instructor te proporcionará una colección `.json` con todas las peticiones listas.

**Importar colección:**
1. Abrir Thunder Client
2. Collections → Import
3. Seleccionar archivo `techstore-collection.json`
4. ¡Listo para probar!

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### **Problema: "Cannot connect to MongoDB"**

```bash
# Verificar que MONGODB_URI está correcta en .env
# Verificar whitelist de IPs en MongoDB Atlas
# Agregar 0.0.0.0/0 para permitir todas las IPs (solo desarrollo)
```

### **Problema: "Port 5000 already in use"**

```bash
# Cambiar puerto en .env
PORT=5001

# O matar proceso en puerto 5000:
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5000 | xargs kill -9
```

### **Problema: "JWT malformed"**

```bash
# Verificar que el token se envía correctamente:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# NO debe tener espacios extra ni comillas
```

### **Problema: "Validation error"**

```bash
# Leer el mensaje de error que indica qué campo falta o es inválido
# Ejemplo:
{
  "success": false,
  "error": "El email es obligatorio"
}
```

---

## 📊 POBLAR BASE DE DATOS

### **Opción 1: Script Automático (Recomendado)**

El instructor proporcionará un script:

```bash
node scripts/seedDatabase.js
```

Esto crea automáticamente:
- 50 productos de ejemplo
- 5 usuarios de prueba (1 admin, 4 customers)
- 20 órdenes de ejemplo

### **Opción 2: Manual con Postman/Thunder Client**

Usar las peticiones POST para crear:
1. Usuarios (register)
2. Productos (admin)
3. Órdenes (checkout)

---

## 🔒 SEGURIDAD IMPLEMENTADA

✅ **Autenticación JWT** - Tokens seguros
✅ **Passwords encriptados** - bcrypt con salt rounds
✅ **Rate Limiting** - 100 requests/15min por IP
✅ **Helmet** - Headers de seguridad
✅ **CORS configurado** - Solo orígenes permitidos
✅ **Input Sanitization** - Previene NoSQL injection
✅ **XSS Protection** - Limpia inputs maliciosos
✅ **Validation** - Todos los endpoints validados

---

## 📞 SOPORTE

### **Dudas sobre el Backend:**
- Revisar logs en `/logs`
- Consultar con el instructor
- GitHub Issues del proyecto

### **Documentación Útil:**
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Mongoose: https://mongoosejs.com
- JWT: https://jwt.io

---

## ✅ CHECKLIST PARA APRENDICES

Antes de empezar con React, verificar:

- [ ] Backend instalado (`npm install` exitoso)
- [ ] Variables de entorno configuradas (`.env`)
- [ ] Servidor iniciado (`npm run dev`)
- [ ] MongoDB conectado (ver mensaje en consola)
- [ ] Health check funciona (http://localhost:5000/api/health)
- [ ] Thunder Client instalado
- [ ] Colección de pruebas importada
- [ ] Al menos 1 usuario registrado
- [ ] Al menos 5 productos creados
- [ ] Login funciona y devuelve token

**Una vez todo ✅ → Empezar con React!** 🚀

---

## 🎯 ENFOQUE DEL CURSO

**IMPORTANTE:** El backend YA ESTÁ COMPLETO.

Los aprendices deben:
- ✅ Usar este backend tal cual
- ✅ Enfocarse 100% en React (frontend)
- ✅ Aprender a consumir APIs
- ✅ No modificar el backend (salvo bugs)

**Objetivo:** Crear un frontend profesional que consuma esta API.

---

## 📝 NOTAS FINALES

- Este backend está listo para producción (con ajustes menores)
- Todos los endpoints están probados y funcionan
- La estructura es profesional y escalable
- El código está bien comentado
- Sigue mejores prácticas de Node.js

**¡A crear el frontend con React!** ⚛️🚀

---

**README creado:** 9 Noviembre 2025  
**Versión:** 1.0  
**Instructor:** Julián - SENA ADSO  
**Proyecto:** TechStore Pro Backend

