import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .sendStatus(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.sendStatus(401).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.sendStatus(500).json({ message: error.message });
  }
};
