/**
 * Task routes for managing user tasks.
 * All routes are protected and require authentication.
 *
 * POST   /tasks/new      - Create a new task
 * GET    /tasks          - Get all tasks for the authenticated user
 * GET    /tasks/:id      - Get a single task by ID
 * DELETE /tasks/:id      - Delete a task by ID
 * PUT    /tasks/:id      - Update a task by ID
 */
import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  getTask,
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

const router = Router();

router.post("/tasks/new", auth, createTask);
router.get("/tasks", auth, getTasks);
router.get("/tasks/:id", auth, getTask);
router.delete("/tasks/:id", auth, deleteTask);
router.put("/tasks/:id", auth, updateTask);

export default router;
