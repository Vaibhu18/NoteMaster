import { userModel } from "../Models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      return res.status(400).send("incomplete input fields");

    const userExist = await userModel.find({ email });
    if (userExist.length > 0) return res.status(400).send("user already exist");

    const createdUser = await userModel.create(req.body);
    return res.status(200).send(createdUser);
  } catch (error) {
    return res.status(500).send("internal server error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("incomplete input fields");

    const userExist = await userModel.find({ email, password });
    if (userExist.length == 0) return res.status(404).send("user not exist");

    return res.status(200).send("user login");
  } catch (error) {
    return res.status(500).send("internal server error");
  }
};
