import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const SALT_ROUNDS = 10;

// Register Account
async function register(data) {
  const { name, email, password, confirmPassword } = data;

  if (!name || !email || !password || !confirmPassword) {
    const err = new Error("All fields are mandatory");
    err.status = 400;
    throw err;
  }

  if (password !== confirmPassword) {
    const err = new Error("Passwords do not match");
    err.status = 400;
    throw err;
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const err = new Error("User already exists");
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: "merchant",
    tenantId: null,
  });

  const token = generateToken(user);

  return {
    token,
    user: sanitizeUser(user),
  };
}

// Login
async function login(data) {
  const { email, password } = data;

  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.status = 400;
    throw err;
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = generateToken(user);

  return {
    token,
    user: sanitizeUser(user),
  };
}

// Get Logged-in User
async function me(userId) {
  const user = await User.findById(userId);

  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  return sanitizeUser(user);
}

// Generate JWT
function generateToken(user) {
  return jwt.sign(
    {
      userId: user._id,
      tenantId: user.tenantId,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

// Remove sensitive fields
function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
  };
}

export { register, login, me };
