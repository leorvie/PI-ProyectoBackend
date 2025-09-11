/**
 * Mongoose User model schema.
 * Represents a user in the system with authentication and password reset fields.
 * @typedef {Object} User
 * @property {string} name - User's first name.
 * @property {string} lastname - User's last name.
 * @property {number} age - User's age (minimum 13).
 * @property {string} email - User's unique email address.
 * @property {string} password - User's hashed password.
 * @property {string} [resetPasswordToken] - Token for password reset.
 * @property {Date} [resetPasswordExpires] - Expiration date for the reset token.
 * @property {Date} createdAt - Date when the user was created (auto-managed).
 * @property {Date} updatedAt - Date when the user was last updated (auto-managed).
 */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
