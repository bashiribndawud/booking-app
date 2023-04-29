import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import { UserModel } from "../models/userModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(422).json({ msg: "Token not provided" });
    }
    const { id } = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    const { password: userPassword, ...rest } = user._doc;
    return res.status(200).json(rest);

  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};
