// =============================================
// MODELO USUARIO - TECHSTORE PRO ECOMMERCE
// VERSIÓN SIMPLIFICADA PARA CURSO SENA
// =============================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log('👤 Iniciando creación del modelo User simplificado...');

// =============================================
// ESQUEMA DEL USUARIO SIMPLIFICADO
// =============================================

const userSchema = new mongoose.Schema({
    
    // =============================================
    // CAMPOS OBLIGATORIOS (SOLO 4)
    // =============================================
    
    firstName: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [50, 'El nombre no puede tener más de 50 caracteres']
    },
    
    lastName: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true,
        minlength: [2, 'El apellido debe tener al menos 2 caracteres'],
        maxlength: [50, 'El apellido no puede tener más de 50 caracteres']
    },
    
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            message: 'Por favor ingresa un email válido'
        },
        index: true
    },
    
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        select: false
    },
    
    // =============================================
    // CAMPOS OPCIONALES (NO REQUERIDOS)
    // =============================================
    
    role: {
        type: String,
        enum: ['customer', 'admin', 'moderator'],
        default: 'customer'
    },
    
    isActive: {
        type: Boolean,
        default: true
    },
    
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    
    phone: {
        type: String,
        trim: true
    },
    
    address: {
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        zipCode: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            default: 'Colombia'
        }
    },
    
    dateOfBirth: {
        type: Date
    },
    
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer-not-to-say'],
        default: 'prefer-not-to-say'
    },
    
    avatar: {
        type: String
    },
    
    lastLogin: {
        type: Date,
        default: Date.now
    },
    
    loginAttempts: {
        type: Number,
        default: 0
    },
    
    totalOrders: {
        type: Number,
        default: 0
    },
    
    totalSpent: {
        type: Number,
        default: 0
    },
    
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    
    passwordResetToken: {
        type: String,
        select: false
    },
    
    passwordResetExpires: {
        type: Date,
        select: false
    }
    
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// =============================================
// MIDDLEWARE: ENCRIPTAR CONTRASEÑA
// =============================================

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        console.log('🔐 Encriptando contraseña...');
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log('✅ Contraseña encriptada exitosamente');
        next();
    } catch (error) {
        console.error('❌ Error al encriptar contraseña:', error);
        next(error);
    }
});

// =============================================
// MÉTODOS DE INSTANCIA
// =============================================

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        console.log('🔑 Comparando contraseñas...');
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        console.error('❌ Error al comparar contraseñas:', error);
        throw error;
    }
};

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { 
            id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.JWT_SECRET || 'secret-key',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    return token;
};

// =============================================
// CAMPOS VIRTUALES
// =============================================

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('age').get(function() {
    if (!this.dateOfBirth) return null;
    
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
});

userSchema.virtual('customerLevel').get(function() {
    if (this.totalSpent < 500000) return 'bronze';
    if (this.totalSpent < 2000000) return 'silver';
    if (this.totalSpent < 5000000) return 'gold';
    return 'platinum';
});

// =============================================
// MÉTODOS ESTÁTICOS
// =============================================

userSchema.statics.findByEmail = function(email) {
    console.log(`🔍 Buscando usuario por email: ${email}`);
    return this.findOne({ 
        email: email.toLowerCase() 
    }).select('+password');
};

userSchema.statics.getActiveUsers = function(limit = 50) {
    console.log(`👥 Obteniendo usuarios activos (límite: ${limit})...`);
    return this.find({ 
        isActive: true 
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-password');
};

userSchema.statics.getUsersByRole = function(role) {
    console.log(`👑 Obteniendo usuarios con rol: ${role}...`);
    return this.find({ 
        role: role,
        isActive: true 
    })
    .sort({ createdAt: -1 });
};

// =============================================
// CREAR Y EXPORTAR EL MODELO
// =============================================

const User = mongoose.model('User', userSchema);

console.log('✅ Modelo User simplificado creado exitosamente');
console.log('📋 Collection en MongoDB: users');
console.log('🔒 Campos obligatorios: firstName, lastName, email, password');
console.log('📝 Campos opcionales: phone, address, dateOfBirth, gender');
console.log('🔐 Contraseña mínima: 6 caracteres');

module.exports = User;