import { Router } from "express";
import { registerAccount, registerStore, login, getMe } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register-account", registerAccount);
router.post("/register-store", protect, registerStore);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;