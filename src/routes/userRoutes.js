import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
} from "../controllers/userController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

export default router;
