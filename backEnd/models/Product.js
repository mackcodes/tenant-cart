import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
      index: true, // every product query filters by tenant
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ tenantId: 1, category: 1 });  //compound indexing

export default mongoose.model('Product', productSchema);
