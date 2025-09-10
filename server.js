/**
 * Entry point for the backend server.
 * Connects to the database and starts the Express application on port 3000.
 */
import app from "./app.js";
import { connectDB } from "./src/config/database.js";
import dotenv from "dotenv";
dotenv.config();

connectDB();
app.listen(process.env.PORT || 3000);

console.log("Server on port", process.env.PORT || 3000);
