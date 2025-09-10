import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
  verifyToken,
  profile,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", auth, profile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
