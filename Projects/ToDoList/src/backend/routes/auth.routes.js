import express from "express"
import bcrypt from "bcrypt"
import { signupController } from "../controllers/auth.controller.js";
const router = express.Router()
import { loginController } from "../controllers/auth.controller.js";

router.post("/register",signupController);
router.post("/login",loginController);
export default router;