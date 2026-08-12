import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email"
        },
    },
    passwordHash:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['merchant', 'admin'],
        default: 'merchant'
    },
    tenantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
},
{timestamps: true}
);

export default mongoose.model('User', userSchema);
