import { Router } from "express";
import { upload } from "../utils/fileUpload.js";
import { isAuthenticated } from "../middleware/auth.js";
import { addNewPlace } from "../controller/placeController.js";
import {
  register,
  login,
  uploadByLink,
  UploadImage,
} from "../controller/authController.js";
import { getUserProfile } from "../controller/userController.js";


const router = Router();

router.post("/register", register);
router.post("/login", login)
router.get("/profile", getUserProfile);
router.post("/upload-by-link", uploadByLink);
router.post("/upload", upload.array('photos', 100), UploadImage);
router.post("/newplace", isAuthenticated,  addNewPlace);

export default router;
