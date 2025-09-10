/**
 * Entry point for the backend server.
 * Connects to the database and starts the Express application on port 3000.
 */
import app from "./app.js";
import { connectDB } from "./src/config/database.js";

connectDB();
app.listen(3000);

console.log("Server on port", 3000);
