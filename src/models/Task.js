import mongoose from "mongoose";

/**
 * Mongoose Task model schema.
 * Represents a task belonging to a user, with status and timestamps.
 * @typedef {Object} Task
 * @property {string} title - Title of the task.
 * @property {string} details - Detailed description of the task.
 * @property {string} status - Status of the task (e.g., 'Pending', 'Completed').
 * @property {Date} date - Due date of the task.
 * @property {mongoose.Schema.Types.ObjectId} user - Reference to the user who owns the task.
 * @property {Date} createdAt - Date when the task was created (auto-managed).
 * @property {Date} updatedAt - Date when the task was last updated (auto-managed).
 */
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 50 },
    details: { type: String, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ["Por Hacer", "Haciendo", "Hecho"],
      default: "Por Hacer",
    },
    date: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
