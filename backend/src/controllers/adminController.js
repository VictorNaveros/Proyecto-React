// =============================================
// CONTROLADOR DE ADMINISTRACIÓN - TECHSTORE PRO
// =============================================

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

/**
 * @desc    Obtener estadísticas generales del dashboard admin
 * @route   GET /api/admin/dashboard
 * @access  Privado (Solo Admin)
 */
exports.getDashboard = async (req, res, next) => {
    try {
        console.log('📊 Obteniendo estadísticas del dashboard admin...');

        // Obtener estadísticas de usuarios
        const totalUsers = await User.countDocuments();
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const newUsersThisMonth = await User.countDocuments({
            createdAt: { $gte: firstDayOfMonth }
        });

        // Obtener estadísticas de productos
        const totalProducts = await Product.countDocuments();
        const lowStockProducts = await Product.countDocuments({
            stock: { $lte: 10 }
        });

        // Obtener estadísticas de órdenes
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({
            status: 'pending'
        });

        // Calcular ventas totales
        const salesData = await Order.aggregate([
            {
                $match: {
                    status: { $ne: 'cancelled' }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                    totalOrders: { $sum: 1 }
                }
            }
        ]);

        const totalRevenue = salesData.length > 0 ? salesData[0].totalRevenue : 0;
        const completedOrders = salesData.length > 0 ? salesData[0].totalOrders : 0;
        const avgOrderValue = completedOrders > 0 ? totalRevenue / completedOrders : 0;

        console.log('✅ Estadísticas obtenidas exitosamente');

        res.status(200).json({
            success: true,
            data: {
                users: {
                    total: totalUsers,
                    newThisMonth: newUsersThisMonth
                },
                products: {
                    total: totalProducts,
                    lowStock: lowStockProducts
                },
                orders: {
                    total: totalOrders,
                    pending: pendingOrders
                },
                sales: {
                    total: totalRevenue,
                    avgOrderValue: Math.round(avgOrderValue)
                }
            }
        });

    } catch (error) {
        console.error('❌ Error en getDashboard:', error.message);
        next(error);
    }
};

/**
 * @desc    Obtener todos los usuarios (con paginación y búsqueda)
 * @route   GET /api/admin/users
 * @access  Privado (Solo Admin)
 */
exports.getAllUsers = async (req, res, next) => {
    try {
        console.log('👥 Obteniendo lista de usuarios...');

        // Parámetros de consulta
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';

        // Construir filtro de búsqueda
        let query = {};
        
        if (search) {
            query = {
                $or: [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            };
        }

        // Ejecutar consulta con paginación
        const users = await User.find(query)
            .select('-password') // Excluir contraseñas
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        // Obtener total de documentos
        const total = await User.countDocuments(query);

        console.log(`✅ ${users.length} usuarios obtenidos (página ${page}/${Math.ceil(total / limit)})`);

        res.status(200).json({
            success: true,
            count: users.length,
            total: total,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                limit: limit,
                hasNextPage: page < Math.ceil(total / limit),
                hasPrevPage: page > 1
            },
            data: users
        });

    } catch (error) {
        console.error('❌ Error en getAllUsers:', error.message);
        next(error);
    }
};

/**
 * @desc    Obtener un usuario específico por ID
 * @route   GET /api/admin/users/:id
 * @access  Privado (Solo Admin)
 */
exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        console.log(`🔍 Buscando usuario: ${userId}`);

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }

        // Obtener estadísticas de órdenes del usuario
        const orderStats = await Order.aggregate([
            {
                $match: { user: user._id }
            },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalSpent: { $sum: '$totalPrice' },
                    pendingOrders: {
                        $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
                    }
                }
            }
        ]);

        const stats = orderStats.length > 0 ? orderStats[0] : {
            totalOrders: 0,
            totalSpent: 0,
            pendingOrders: 0
        };

        console.log(`✅ Usuario encontrado: ${user.email}`);

        res.status(200).json({
            success: true,
            data: {
                user: user,
                statistics: {
                    totalOrders: stats.totalOrders,
                    totalSpent: stats.totalSpent,
                    pendingOrders: stats.pendingOrders
                }
            }
        });

    } catch (error) {
        console.error('❌ Error en getUserById:', error.message);
        next(error);
    }
};

console.log('✅ Controlador de administración cargado');
