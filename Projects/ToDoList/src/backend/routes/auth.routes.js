import express from "express"
import bcrypt from "bcrypt"
import { getProfileController, signupController , getStaffController} from "../controllers/auth.controller.js";
const router = express.Router()
import { loginController } from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { authenticateStaff } from "../middlewares/authenticateStaff.js";
router.post("/register",signupController);
router.post("/login",loginController);
router.get("/profile",authenticateJWT,getProfileController)
router.get("/staff", authenticateJWT, authenticateStaff , getStaffController);
export default router;