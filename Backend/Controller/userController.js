import { userModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      return res.status(400).json({ error: "incomplete input fields" });

    const userExist = await userModel.find({ email });
    if (userExist.length > 0)
      return res.status(400).json({ error: "user already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();
    // const token = jwt.sign({ userId: newUser._id}, "vaibhav", { expiresIn: "1h" });
    // console.log(token)
    return res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Incomplete input fields" });

    const userExist = await userModel.findOne({ email });
    if (!userExist) return res.status(404).json({ error: "No user found" });

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    return res
      .status(200)
      .json({ message: "user login successfully", user: userExist });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
