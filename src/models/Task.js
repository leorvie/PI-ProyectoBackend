import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 50 },
    details: { type: String, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ["Por Hacer", "Haciendo", "Hecho"],
      default: "Por Hacer",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
