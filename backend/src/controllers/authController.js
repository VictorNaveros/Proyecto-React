// backend/src/controllers/authController.js
// VERSIÓN SIMPLIFICADA - Solo requiere firstName, lastName, email, password

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

console.log('🔐 Inicializando controlador de autenticación');

// =============================================
// FUNCIÓN 1: REGISTER - CREAR NUEVA CUENTA
// =============================================

const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body;
        
        console.log(`📝 Intento de registro: ${email}`);
        
        // VALIDACIÓN SIMPLIFICADA - Solo campos básicos obligatorios
        if (!firstName || !lastName || !email || !password) {
            console.log('❌ Faltan campos requeridos');
            return res.status(400).json({
                success: false,
                error: 'Campos requeridos',
                details: 'firstName, lastName, email y password son obligatorios'
            });
        }
        
        // VALIDACIÓN 2: Verificar que el email no esté registrado
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        
        if (existingUser) {
            console.log(`❌ Email ya registrado: ${email}`);
            return res.status(400).json({
                success: false,
                error: 'Email ya registrado',
                message: 'Ya existe una cuenta con este email'
            });
        }
        
        // VALIDACIÓN 3: Solo admin puede crear otros admins
        if (role === 'admin') {
            console.log('❌ Intento no autorizado de crear admin');
            return res.status(403).json({
                success: false,
                error: 'No autorizado',
                message: 'No tienes permisos para crear usuarios admin'
            });
        }
        
        // CREAR USUARIO - Solo con campos que lleguen
        const userData = {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            // Campos opcionales
            ...(role && { role }),
            ...(phone && { phone }),
            ...(req.body.dateOfBirth && { dateOfBirth: req.body.dateOfBirth }),
            ...(req.body.gender && { gender: req.body.gender }),
            ...(req.body.address && { address: req.body.address })
        };
        
        const user = await User.create(userData);
        
        console.log(`✅ Usuario creado exitosamente: ${user.email}`);
        
        // Generar token JWT
        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email,
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '7d' }
        );
        
        // Responder con usuario y token (sin password)
        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt
            }
        });
        
    } catch (error) {
        console.error('❌ Error en register:', error);
        
        // Error de validación de Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                error: 'Error de validación',
                details: messages
            });
        }
        
        // Error de clave duplicada (email)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Email duplicado',
                message: 'Ya existe una cuenta con este email'
            });
        }
        
        // Otros errores
        next(error);
    }
};

// =============================================
// FUNCIÓN 2: LOGIN - INICIAR SESIÓN
// =============================================

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        console.log(`🔑 Intento de login: ${email}`);
        
        // Validar campos
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Credenciales requeridas',
                message: 'Por favor proporciona email y contraseña'
            });
        }
        
        // Buscar usuario por email
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        
        if (!user) {
            console.log(`❌ Usuario no encontrado: ${email}`);
            return res.status(401).json({
                success: false,
                error: 'Credenciales inválidas',
                message: 'Email o contraseña incorrectos'
            });
        }
        
        // Verificar contraseña
        const isPasswordValid = await user.comparePassword(password);
        
        if (!isPasswordValid) {
            console.log(`❌ Contraseña incorrecta para: ${email}`);
            return res.status(401).json({
                success: false,
                error: 'Credenciales inválidas',
                message: 'Email o contraseña incorrectos'
            });
        }
        
        console.log(`✅ Login exitoso: ${user.email}`);
        
        // Generar token
        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email,
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '7d' }
        );
        
        // Responder con usuario y token
        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt
            }
        });
        
    } catch (error) {
        console.error('❌ Error en login:', error);
        next(error);
    }
};

// =============================================
// FUNCIÓN 3: GET PROFILE - OBTENER PERFIL
// =============================================

const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }
        
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt
            }
        });
        
    } catch (error) {
        console.error('❌ Error en getProfile:', error);
        next(error);
    }
};

// =============================================
// FUNCIÓN 4: UPDATE PROFILE - ACTUALIZAR PERFIL
// =============================================

/**
 * @desc    Actualizar perfil del usuario
 * @route   PUT /api/auth/profile
 * @access  Privado (requiere token)
 */
const updateProfile = async (req, res, next) => {
    try {
        // req.user es agregado por middleware protect
        const userId = req.user?._id;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'ID de usuario requerido'
            });
        }
        
        console.log(`✏️ Actualizando perfil: ${userId}`);
        
        // CAMPOS PERMITIDOS PARA ACTUALIZAR
        const allowedUpdates = [
            'firstName', 
            'lastName', 
            'phone', 
            'dateOfBirth',
            'gender',
            'avatar',
            'address'
        ];
        
        // FILTRAR SOLO CAMPOS PERMITIDOS
        const updates = {};
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        });
        
        // VALIDAR QUE HAY ALGO QUE ACTUALIZAR
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No hay campos para actualizar',
                allowedFields: allowedUpdates
            });
        }
        
        // ACTUALIZAR USUARIO
        const user = await User.findByIdAndUpdate(
            userId,
            updates,
            { 
                new: true,           // Retornar documento actualizado
                runValidators: true  // Ejecutar validaciones
            }
        );
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }
        
        console.log(`✅ Perfil actualizado: ${user.email}`);
        
        // OBTENER PERFIL PÚBLICO ACTUALIZADO
        const publicProfile = user.getPublicProfile();
        
        // RESPUESTA EXITOSA
        res.status(200).json({
            success: true,
            message: 'Perfil actualizado exitosamente',
            user: publicProfile
        });
        
    } catch (error) {
        console.error(`❌ Error en updateProfile: ${error.message}`);
        
        // Errores de validación
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                error: 'Error de validación',
                details: messages
            });
        }
        
        next(error);
    }
};

// =============================================
// FUNCIÓN 5: GET DASHBOARD - ESTADÍSTICAS USUARIO
// =============================================

/**
 * @desc    Obtener dashboard con estadísticas del usuario
 * @route   GET /api/auth/dashboard
 * @access  Privado (requiere token)
 */
const getDashboard = async (req, res, next) => {
    try {
        // req.user es agregado por middleware protect
        const userId = req.user?._id;
        
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'No autenticado',
                message: 'Token inválido o expirado'
            });
        }
        
        console.log(`📊 Obteniendo dashboard: ${userId}`);
        
        // Importar modelo de Order para obtener estadísticas
        const Order = require('../models/Order');
        
        // BUSCAR USUARIO
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }
        
        // OBTENER ESTADÍSTICAS DE ÓRDENES
        const orders = await Order.find({ user: userId })
            .populate('items.product', 'name images price')
            .sort({ createdAt: -1 });
        
        // CALCULAR ESTADÍSTICAS
        const totalOrders = orders.length;
        const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        
        // Contar órdenes por estado
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const processingOrders = orders.filter(o => o.status === 'processing').length;
        const shippedOrders = orders.filter(o => o.status === 'shipped').length;
        const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
        const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
        
        // Última orden
        const lastOrder = orders.length > 0 ? orders[0] : null;
        
        // Órdenes recientes (últimas 5)
        const recentOrders = orders.slice(0, 5).map(order => ({
            _id: order._id,
            orderNumber: order.orderNumber,
            totalPrice: order.totalPrice,
            status: order.status,
            itemCount: order.items.length,
            createdAt: order.createdAt
        }));
        
        console.log(`✅ Dashboard obtenido: ${totalOrders} órdenes, $${totalSpent.toLocaleString()}`);
        
        // RESPUESTA CON ESTADÍSTICAS
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    customerLevel: user.customerLevel || 'Bronze'
                },
                statistics: {
                    totalOrders,
                    totalSpent,
                    avgOrderValue: totalOrders > 0 ? Math.round(totalSpent / totalOrders) : 0,
                    pendingOrders,
                    processingOrders,
                    shippedOrders,
                    deliveredOrders,
                    cancelledOrders
                },
                lastOrder: lastOrder ? {
                    _id: lastOrder._id,
                    orderNumber: lastOrder.orderNumber,
                    totalPrice: lastOrder.totalPrice,
                    status: lastOrder.status,
                    items: lastOrder.items.map(item => ({
                        product: {
                            name: item.product?.name || 'Producto eliminado',
                            image: item.product?.images?.[0] || null,
                            price: item.price
                        },
                        quantity: item.quantity,
                        subtotal: item.price * item.quantity
                    })),
                    createdAt: lastOrder.createdAt
                } : null,
                recentOrders
            }
        });
        
    } catch (error) {
        console.error(`❌ Error en getDashboard: ${error.message}`);
        next(error);
    }
};

// =============================================
// EXPORTAR FUNCIONES
// =============================================

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    getDashboard
};

console.log('✅ Controlador de autenticación exportado');
console.log('📋 Funciones disponibles:');
console.log('   • register - Crear nueva cuenta');
console.log('   • login - Autenticar usuario');
console.log('   • getProfile - Obtener perfil');
console.log('   • updateProfile - Actualizar perfil');