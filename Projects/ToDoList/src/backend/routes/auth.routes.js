import express from "express";
import {
  getProfileController,
  signupController,
  getStaffController,
  refreshTokenController,
} from "../controllers/auth.controller.js";
import { loginController } from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { authenticateStaff } from "../middlewares/authenticateStaff.js";
import {
  googleOAuth,
  googleOAuthCallback,
} from "../controllers/oauth.controller.js";
export const router = express.Router();

router.post("/register", signupController);
router.post("/login", loginController);
router.get("/google", googleOAuth);
router.get("/google/callback", googleOAuthCallback);

router.get("/profile", authenticateJWT, getProfileController);
router.get("/staff", authenticateJWT, authenticateStaff, getStaffController);
router.get("/refresh-token", refreshTokenController);
export default router;
