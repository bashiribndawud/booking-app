import { Router } from "express";
const router = Router();
import { register, login } from "../controller/authController.js";
import { getUserProfile } from "../controller/userController.js";

router.post("/register", register);
router.post("/login", login)
router.get("/profile", getUserProfile);

export default router;
