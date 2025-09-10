import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

// ...existing code...
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, // <--- aquí va el payload recibido
      process.env.TOKEN_SECRET,
      { expiresIn: "2h" },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}
// ...existing code...
