import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
  verifyToken,
  profile,
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", auth, profile);

export default router;
