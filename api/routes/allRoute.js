import { Router } from "express";
import { upload } from "../utils/fileUpload.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  addNewPlace,
  getAllUserPlaces,
  getOnePlace,
  updatePlace,
  getAllPlaces,
} from "../controller/placeController.js";
import {
  register,
  login,
  uploadByLink,
  UploadImage,
} from "../controller/authController.js";
import { getUserProfile } from "../controller/userController.js";
import { NewBooking, AllBookings } from "../controller/bookingController.js";



const router = Router();

router.post("/register", register);
router.post("/login", login)
router.get("/profile", getUserProfile);
router.post("/upload-by-link", uploadByLink);
router.post("/upload", upload.array('photos', 100), UploadImage);
router.post("/newplace", isAuthenticated,  addNewPlace);
router.get("/user-allplaces", isAuthenticated, getAllUserPlaces);
router.get("/place/:id", isAuthenticated, getOnePlace)
router.put("/updateplace/:id", isAuthenticated, updatePlace);
router.get("/places", getAllPlaces);
router.post("/booking", isAuthenticated, NewBooking);
router.get("/bookings", isAuthenticated, AllBookings);

export default router;
