import express from "express"
import { signupSellerController, loginSellerController, refreshSellerTokenController, getSellerProfileController } from "../controllers/sellerAuth.controller.js"
import { authenticateJWT } from "../middlewares/authenticateJWT.js"
import { authenticateSeller } from "../middlewares/authentiateSeller.js"

const router = express.Router()
router.post("/signup", signupSellerController);
router.post("/login", loginSellerController);
router.get("/refresh", refreshSellerTokenController);
router.get("/profile", authenticateJWT, authenticateSeller, getSellerProfileController);

export default router