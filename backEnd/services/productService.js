import Product from "../models/Product.js";

export const listByTenant = (tenantId) => Product.find({ tenant: tenantId }).sort({ createdAt: -1 });

export const create = (tenantId, data) => Product.create({ ...data, tenant: tenantId });

export const update = (tenantId, productId, data) =>
  Product.findOneAndUpdate({ _id: productId, tenant: tenantId }, data, { new: true });

export const remove = (tenantId, productId) =>
  Product.findOneAndDelete({ _id: productId, tenant: tenantId });