import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
  verifyToken,
} from "../controllers/userController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/verify", verifyToken);

export default router;
