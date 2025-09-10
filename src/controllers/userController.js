import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  const { name, lastname, age, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(409).json(["Email is already in use"]);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastname,
      age,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
      lastname: savedUser.lastname,
      age: savedUser.age,
    });
  } catch (error) {
    res.status(500).json(["Server error"]);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(401).json({ message: "Correo o contraseña inválidos" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // o "lax" o "none"
    });

    res.status(200).json({
      id: userFound._id,
      name: userFound.name,
      lastname: userFound.lastname,
      age: userFound.age,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    });
  });
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
