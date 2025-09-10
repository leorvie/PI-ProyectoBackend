import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

/**
 * Creates a signed JWT access token with the given payload.
 * @function createAccessToken
 * @param {Object} payload - The payload to include in the token.
 * @returns {Promise<string>} The signed JWT token as a string.
 */
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
