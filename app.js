/**
 * Express application setup.
 * Configures middleware, routes, and environment variables for the backend API.
 *
 * - Uses CORS with credentials
 * - Parses URL-encoded and JSON request bodies
 * - Handles cookies
 * - Mounts user and task routes under /api/v1
 */

import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/userRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";

configDotenv();

const app = express();

// Lista de orígenes permitidos desde .env
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL, // desarrollo
  process.env.FRONTEND_URL_PROD   // producción
];

// Configuración de CORS
app.use(cors({
  origin: function (origin, callback) {
    // Permite peticiones sin "origin" (ej: Postman) o si el origin está en la lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS: " + origin));
    }
  },
credentials: true,
origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Permitir frontend
methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
allowedHeaders: ['Content-Type', 'Authorization'],
exposedHeaders: ['set-cookie'] // De main
}));

// Soporte para preflight OPTIONS en cualquier ruta
app.options(new RegExp(".*"), cors());

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);

export default app;
