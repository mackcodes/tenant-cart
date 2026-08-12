import mongoose from 'mongoose';
import validator from 'validator';

const tenantSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    logo: {
      type: String, // Image URL
      default: '',
    },

    phone: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value, 'en-IN'),
        message: "Please enter a valid Indian mobile number"
      }
    },

    businessEmail: {
      type: String,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email"
      }
    },

    address: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ['pending', 'active', 'suspended'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Tenant', tenantSchema);
