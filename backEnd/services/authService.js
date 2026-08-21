import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";

export const createAccount = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw Object.assign(new Error("Email already registered"), { statusCode: 409 });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  return user;
};

export const createStoreForUser = async (userId, { storeName, slug }) => {
  const existingSlug = await Tenant.findOne({ slug });
  if (existingSlug) throw Object.assign(new Error("Store URL already taken"), { statusCode: 409 });

  const tenant = await Tenant.create({ storeName, slug, owner: userId });
  await User.findByIdAndUpdate(userId, { tenant: tenant._id });
  return tenant;
};

export const validateLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  return user;
};

export const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};