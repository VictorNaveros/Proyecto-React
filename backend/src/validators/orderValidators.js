// =============================================
// VALIDADORES DE ÓRDENES - TECHSTORE PRO
// =============================================

/**
 * INFORMACIÓN DEL ARCHIVO:
 * 
 * ¿Qué hace este archivo?
 * Define las validaciones para las órdenes del ecommerce
 * 
 * ¿Qué incluye?
 * - Validaciones para crear órdenes
 * - Validaciones para actualizar estado
 * - Validaciones de direcciones de envío
 * - Validaciones de items
 * 
 * Creado: Noviembre 2025
 * Autor: Instructor SENA: Julian Andrés Trujillo
 * Proyecto: TechStore Pro Backend
 */

const { body, param, query } = require('express-validator');

console.log('📋 Cargando validadores de órdenes...');

// =============================================
// VALIDACIONES PARA CREAR ORDEN
// =============================================

/**
 * Validaciones para POST /api/orders
 * Verifica que todos los datos de la orden sean correctos
 */
exports.createOrderValidation = [
    // ==================
    // ITEMS
    // ==================
    body('items')
        .exists().withMessage('Los items son obligatorios')
        .isArray({ min: 1 }).withMessage('Debe haber al menos un item en la orden')
        .custom((items) => {
            // Validar cada item
            for (const item of items) {
                if (!item.product || !item.quantity || !item.price) {
                    throw new Error('Cada item debe tener product, quantity y price');
                }
                if (item.quantity < 1) {
                    throw new Error('La cantidad debe ser mayor a 0');
                }
                if (item.price < 0) {
                    throw new Error('El precio no puede ser negativo');
                }
            }
            return true;
        }),

    // ==================
    // DIRECCIÓN DE ENVÍO
    // ==================
    body('shippingAddress')
        .exists().withMessage('La dirección de envío es obligatoria')
        .isObject().withMessage('La dirección debe ser un objeto'),

    body('shippingAddress.street')
        .trim()
        .notEmpty().withMessage('La calle es obligatoria')
        .isLength({ min: 5, max: 200 }).withMessage('La calle debe tener entre 5 y 200 caracteres'),

    body('shippingAddress.city')
        .trim()
        .notEmpty().withMessage('La ciudad es obligatoria')
        .isLength({ min: 2, max: 100 }).withMessage('La ciudad debe tener entre 2 y 100 caracteres'),

    body('shippingAddress.state')
        .trim()
        .notEmpty().withMessage('El departamento/estado es obligatorio')
        .isLength({ min: 2, max: 100 }).withMessage('El departamento debe tener entre 2 y 100 caracteres'),

    body('shippingAddress.zipCode')
        .trim()
        .notEmpty().withMessage('El código postal es obligatorio')
        .matches(/^[0-9]{5,10}$/).withMessage('Código postal inválido (5-10 dígitos)'),

    body('shippingAddress.country')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('El país debe tener entre 2 y 100 caracteres')
        .default('Colombia'),

    // ==================
    // MÉTODO DE PAGO
    // ==================
    body('paymentMethod')
        .trim()
        .notEmpty().withMessage('El método de pago es obligatorio')
        .isIn(['Tarjeta de Crédito', 'Tarjeta de Débito', 'PSE', 'Efectivo'])
        .withMessage('Método de pago inválido'),

    // ==================
    // PRECIOS
    // ==================
    body('itemsPrice')
        .isFloat({ min: 0 }).withMessage('El precio de items debe ser mayor o igual a 0')
        .toFloat(),

    body('taxPrice')
        .isFloat({ min: 0 }).withMessage('El precio de impuestos debe ser mayor o igual a 0')
        .toFloat(),

    body('shippingPrice')
        .isFloat({ min: 0 }).withMessage('El precio de envío debe ser mayor o igual a 0')
        .toFloat(),

    body('totalPrice')
        .isFloat({ min: 0.01 }).withMessage('El precio total debe ser mayor a 0')
        .toFloat()
        .custom((totalPrice, { req }) => {
            // Verificar que el total sea correcto
            const calculatedTotal = req.body.itemsPrice + req.body.taxPrice + req.body.shippingPrice;
            const difference = Math.abs(calculatedTotal - totalPrice);
            
            // Permitir una diferencia de 0.01 por redondeo
            if (difference > 0.01) {
                throw new Error(`El total no coincide. Esperado: ${calculatedTotal.toFixed(2)}, Recibido: ${totalPrice.toFixed(2)}`);
            }
            return true;
        }),

    // ==================
    // DESCUENTO (OPCIONAL)
    // ==================
    body('discount')
        .optional()
        .isFloat({ min: 0 }).withMessage('El descuento debe ser mayor o igual a 0')
        .toFloat(),

    body('promoCode')
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage('El código promocional debe tener entre 3 y 50 caracteres')
];

// =============================================
// VALIDACIONES PARA ACTUALIZAR ESTADO DE ORDEN
// =============================================

/**
 * Validaciones para PUT /api/orders/:id/status
 * Solo admin puede cambiar el estado
 */
exports.updateOrderStatusValidation = [
    param('id')
        .isMongoId().withMessage('ID de orden inválido'),

    body('status')
        .trim()
        .notEmpty().withMessage('El estado es obligatorio')
        .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
        .withMessage('Estado inválido. Opciones: pending, processing, shipped, delivered, cancelled')
];

// =============================================
// VALIDACIONES PARA OBTENER ORDEN POR ID
// =============================================

/**
 * Validaciones para GET /api/orders/:id
 */
exports.getOrderByIdValidation = [
    param('id')
        .isMongoId().withMessage('ID de orden inválido')
];

// =============================================
// VALIDACIONES PARA ELIMINAR ORDEN
// =============================================

/**
 * Validaciones para DELETE /api/orders/:id
 */
exports.deleteOrderValidation = [
    param('id')
        .isMongoId().withMessage('ID de orden inválido')
];

// =============================================
// VALIDACIONES PARA FILTROS DE ÓRDENES (ADMIN)
// =============================================

/**
 * Validaciones para GET /api/orders (con filtros)
 * Solo admin puede ver todas las órdenes
 */
exports.getOrdersValidation = [
    query('status')
        .optional()
        .trim()
        .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'all'])
        .withMessage('Estado inválido'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('El límite debe ser entre 1 y 100')
        .toInt(),

    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('La página debe ser mayor a 0')
        .toInt(),

    query('userId')
        .optional()
        .isMongoId().withMessage('ID de usuario inválido'),

    query('startDate')
        .optional()
        .isISO8601().withMessage('Fecha de inicio inválida (formato ISO8601)')
        .toDate(),

    query('endDate')
        .optional()
        .isISO8601().withMessage('Fecha de fin inválida (formato ISO8601)')
        .toDate()
        .custom((endDate, { req }) => {
            if (req.query.startDate && endDate < req.query.startDate) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }
            return true;
        })
];

// =============================================
// VALIDACIONES PARA AGREGAR REVIEW (OPCIONAL)
// =============================================

/**
 * Validaciones para POST /api/orders/:id/review
 * Permitir al usuario dejar una review de la orden
 */
exports.addOrderReviewValidation = [
    param('id')
        .isMongoId().withMessage('ID de orden inválido'),

    body('rating')
        .isInt({ min: 1, max: 5 }).withMessage('El rating debe ser entre 1 y 5')
        .toInt(),

    body('comment')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('El comentario no puede tener más de 500 caracteres')
];

// =============================================
// VALIDACIONES PARA CANCELAR ORDEN
// =============================================

/**
 * Validaciones para PUT /api/orders/:id/cancel
 * Usuario puede cancelar su propia orden si está en pending
 */
exports.cancelOrderValidation = [
    param('id')
        .isMongoId().withMessage('ID de orden inválido'),

    body('reason')
        .optional()
        .trim()
        .isLength({ min: 10, max: 500 }).withMessage('La razón debe tener entre 10 y 500 caracteres')
];

// =============================================
// VALIDACIONES PARA TRACKING DE ORDEN
// =============================================

/**
 * Validaciones para PUT /api/orders/:id/tracking
 * Admin puede agregar información de tracking
 */
exports.updateTrackingValidation = [
    param('id')
        .isMongoId().withMessage('ID de orden inválido'),

    body('trackingNumber')
        .trim()
        .notEmpty().withMessage('El número de tracking es obligatorio')
        .isLength({ min: 5, max: 100 }).withMessage('El número de tracking debe tener entre 5 y 100 caracteres'),

    body('carrier')
        .trim()
        .notEmpty().withMessage('La empresa de envío es obligatoria')
        .isIn(['Servientrega', 'Coordinadora', 'Deprisa', 'InterRapidisimo', 'Envia', 'TCC', 'Otra'])
        .withMessage('Empresa de envío inválida')
];

console.log('✅ Validadores de órdenes cargados exitosamente');
console.log('   📋 createOrderValidation - Crear orden');
console.log('   📋 updateOrderStatusValidation - Actualizar estado');
console.log('   📋 getOrderByIdValidation - Obtener por ID');
console.log('   📋 deleteOrderValidation - Eliminar orden');
console.log('   📋 getOrdersValidation - Filtros para lista');
console.log('   📋 addOrderReviewValidation - Agregar review');
console.log('   📋 cancelOrderValidation - Cancelar orden');
console.log('   📋 updateTrackingValidation - Actualizar tracking');

module.exports = exports;

/**
 * CÓMO USAR ESTOS VALIDADORES:
 * 
 * En routes/orders.js:
 * 
 * const { 
 *   createOrderValidation,
 *   updateOrderStatusValidation 
 * } = require('../validators/orderValidators');
 * const { handleValidationErrors } = require('../middleware/validation');
 * 
 * router.post('/', 
 *   protect,
 *   createOrderValidation,
 *   handleValidationErrors,
 *   createOrder
 * );
 * 
 * router.put('/:id/status',
 *   protect,
 *   authorize('admin'),
 *   updateOrderStatusValidation,
 *   handleValidationErrors,
 *   updateOrderStatus
 * );
 */