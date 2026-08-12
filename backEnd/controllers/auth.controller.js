import * as authService from '../services/auth.service.js';

// Register Account
async function register(req, res, next) {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

// Login
async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

// Get Logged-in User
async function me(req, res, next) {
  try {
    const user = await authService.me(req.user.userId);
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

export { register, login, me };
