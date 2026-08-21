import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    storeName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "approved", "rejected", "suspended"], default: "pending" },
    branding: {
      logoUrl: { type: String, default: "" },
      primaryColor: { type: String, default: "#4F46E5" },
      templateId: { type: String, default: "default" },
    },
    razorpay: {
      accountId: { type: String, default: null },
      onboarded: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tenant", tenantSchema);