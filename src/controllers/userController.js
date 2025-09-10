import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

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
    res.cookie("token", token);
    res.status(200).json({
      id: userFound._id,
      username: userFound.name,
      lastname: userFound.lastname,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
