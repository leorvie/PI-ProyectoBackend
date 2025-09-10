import express from "express";

import cors from "cors";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/userRoutes.js";

configDotenv();

const app = express();
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", userRoutes);

export default app;
