import express from "express";

import cors from "cors";
import { configDotenv } from "dotenv";

import cookieParser from "cookie-parser";

configDotenv();
const app = express();
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
export default app;