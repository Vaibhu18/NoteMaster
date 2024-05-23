import express from "express";
import { registerUser, loginUser } from "../Controller/userController.js";
export const userRouter = express.Router();

userRouter.post("/api/register", registerUser);
userRouter.post("/api/login", loginUser);
