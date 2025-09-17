/**
 * User routes for authentication and profile management.
 *
 * POST   /register         - Register a new user
 * POST   /login            - Log in a user
 * POST   /logout           - Log out the current user
 * GET    /verify           - Verify authentication token
 * GET    /profile          - Get the authenticated user's profile
 * PUT    /profile/edit     - Update the authenticated user's profile
 * POST   /forgot-password  - Send password reset email
 * POST   /reset-password   - Reset user password with a valid token
 */
import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
  verifyToken,
  profile,
  forgotPassword,
  resetPassword,
  updateUser
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", auth, profile);
router.put("/profile/edit", auth, updateUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
