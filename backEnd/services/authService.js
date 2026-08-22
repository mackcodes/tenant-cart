import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Tenant from "../models/Tenant.js";

export const createAccount = async ({
  name,
  email,
  password,
}) => {
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw Object.assign(
      new Error("Email already registered"),
      {
        statusCode: 409,
      }
    );
  }

  const passwordHash = await bcrypt.hash(
    password,
    10
  );

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  return user;
};

export const createStoreForUser = async (
  userId,
  storeData
) => {
  const existingTenant = await Tenant.findOne({
    slug: storeData.slug,
  });

  if (existingTenant) {
    throw Object.assign(
      new Error("Store URL already taken"),
      {
        statusCode: 409,
      }
    );
  }

  const existingUser = await User.findById(userId);

  if (!existingUser) {
    throw Object.assign(
      new Error("User not found"),
      {
        statusCode: 404,
      }
    );
  }

  if (existingUser.tenant) {
    throw Object.assign(
      new Error("This account already has a store"),
      {
        statusCode: 409,
      }
    );
  }

  const tenant = await Tenant.create({
    ...storeData,
    owner: userId,
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      tenant: tenant._id,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-passwordHash");

  if (!updatedUser) {
    throw Object.assign(
      new Error("User could not be updated"),
      {
        statusCode: 500,
      }
    );
  }

  return {
    tenant,
    user: updatedUser,
  };
};

export const validateLogin = async (
  email,
  password
) => {
  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user) {
    throw Object.assign(
      new Error("Invalid credentials"),
      {
        statusCode: 401,
      }
    );
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    throw Object.assign(
      new Error("Invalid credentials"),
      {
        statusCode: 401,
      }
    );
  }

  return user;
};

export const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is missing from environment variables"
    );
  }

  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};