import * as authService from "../services/authService.js";

export const registerAccount = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await authService.createAccount({ name, email, password });
    const token = authService.signToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, tenant: user.tenant },
    });
  } catch (err) {
    next(err);
  }
};

export const registerStore = async (req, res, next) => {
  try {
    const { storeName, slug } = req.body;
    if (!storeName || !slug) {
      return res.status(400).json({ message: "storeName and slug are required" });
    }
    const tenant = await authService.createStoreForUser(req.user._id, { storeName, slug });
    res.status(201).json({ tenant });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.validateLogin(email, password);
    const token = authService.signToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, tenant: user.tenant },
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res) => {
  res.json({ user: req.user });
};