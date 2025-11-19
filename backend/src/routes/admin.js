// =============================================
// RUTAS DE ADMINISTRACIÓN - TECHSTORE PRO
// =============================================

const express = require('express');
const router = express.Router();

// Importar controlador de administración
const {
    getDashboard,
    getAllUsers,
    getUserById
} = require('../controllers/adminController');

// Importar middleware de autenticación
const { protect, authorize } = require('../middleware/auth');

console.log('👨‍💼 Configurando rutas de administración...');

// =============================================
// TODAS LAS RUTAS REQUIEREN AUTENTICACIÓN Y ROL ADMIN
// =============================================

/**
 * @route   GET /api/admin/dashboard
 * @desc    Obtener estadísticas generales del dashboard
 * @access  Privado (solo admin)
 */
router.get('/dashboard', protect, authorize('admin'), getDashboard);

/**
 * @route   GET /api/admin/users
 * @desc    Obtener lista de todos los usuarios (con paginación y búsqueda)
 * @access  Privado (solo admin)
 * @query   ?search=nombre&page=1&limit=20
 */
router.get('/users', protect, authorize('admin'), getAllUsers);

/**
 * @route   GET /api/admin/users/:id
 * @desc    Obtener detalles de un usuario específico
 * @access  Privado (solo admin)
 */
router.get('/users/:id', protect, authorize('admin'), getUserById);

console.log('✅ Rutas de administración configuradas:');
console.log('   📊 GET /api/admin/dashboard - Dashboard general');
console.log('   👥 GET /api/admin/users - Lista de usuarios');
console.log('   👤 GET /api/admin/users/:id - Detalle de usuario');

// =============================================
// EXPORTAR ROUTER
// =============================================

module.exports = router;
