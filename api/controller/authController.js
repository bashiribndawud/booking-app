import { UserModel } from "../models/userModel.js";
import download from "image-downloader"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ msg: "email is required" });
    }
    if (!name) {
      return res.status(400).json({ msg: "name is required" });
    }
    if (!password) {
      return res.status(400).json({ msg: "password is required" });
    }

    if (password.length < 7) {
      return res.status(400).json({ msg: "Password min is 7" });
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ msg: "User Created" });
  } catch (error) {
    return res.status(422).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email Required" });
    }
    if (!password) {
      return res.status(400).json({ msg: "Password Required" });
    }
    // user exist
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ msg: "Invalid Email Address" });
    }
    // password match
    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      return res.status(422).json({ msg: "Invalid Email or Password" });
    }

    const payload = { id: userExist._id };

    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: "7d",
    });

    const { password: userPassword, ...rest } = userExist._doc;
    //cookie will be avaliable on the next request as long as it has not expired or deleted by the client
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //expires in 7 days
        domain: "127.0.0.1:5173",
        path: "/indexPage",
      })
      .json({
        msg: "User logged In Successfully",
        userInfo: { ...rest },
        token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const parentDir = path.join(__dirname, '..')
  try {
    if (!link) {
      return res.status(404).json({ msg: "Link not provided" });
    }
    const newName = 'photo' + Date.now() + '.jpg'
    const options = {
      url: link,
      dest: parentDir + "/uploads/" + newName,
    };
    await download.image(options)
    res.status(201).json(newName);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
};


export const UploadImage = async (req, res) => {
  return res.json(req.files)
}



