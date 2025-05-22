import jwt from "../lib/jwt.js";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt"; // Parolni shifrlash uchun

// Foydalanuvchi ro'yxatdan o'tkazish
export const register = async (req, res) => {
  try {
    const { last_name, first_name, email, password, age } = req.body;

    // Ma'lumotlar validatsiyasi
    if (!last_name || !first_name || !email || !password || !age) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    if (age < 0 || typeof age !== "number") {
      return res
        .status(400)
        .json({ message: "Age must be a positive number!" });
    }

    // Parolni shifrlash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Foydalanuvchini yaratish
    const data = await UserModel.create({
      last_name,
      first_name,
      email,
      password: hashedPassword, // Shifrlangan parol
      age,
    });

    // JWT token yaratish
    const token = jwt.sign({ email: data.email, id: data.id });

    return res.status(200).send({
      message: "User successfully registered",
      status: 200,
      token: token,
    });
  } catch (error) {
    return res?.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

// Foydalanuvchi tizimga kirish
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Foydalanuvchini topish
    const data = await UserModel.findOne({ email });
    console.log(data);

    if (!data) {
      return res?.status(400).send({
        status: 400,
        message: "User not found",
      });
    }

    // Parolni tekshirish
    const isPasswordValid = await bcrypt.compare(password, data.password);

    if (!isPasswordValid) {
      return res?.status(400).send({
        status: 400,
        message: "Invalid password",
      });
    }

    // JWT token yaratish
    const token = jwt.sign({ email: data.email, id: data.id });

    return res.status(200).send({
      message: "Login successful",
      status: 200,
      token: token,
    });
  } catch (error) {
    return res?.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
