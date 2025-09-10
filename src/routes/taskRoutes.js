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
