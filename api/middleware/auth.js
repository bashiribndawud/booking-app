import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import * as dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "authorization header not set" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "token not found" });
    }
    const { id } = jwt.verify(token, process.env.SECRET);

    const user = await UserModel.findById(id);
    
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    const { password, ...rest } = user._doc;
    req.user = {...rest, id};
    next();
  } catch (error) {
    res.status(503).json({
      err: "Token is not valid",
    });
  }
};
