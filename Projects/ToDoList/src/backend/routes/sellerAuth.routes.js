import express from "express"
import { signupSellerController ,refreshSellerTokenController,getSellerProfileController} from "../controllers/sellerAuth.controller.js"

const router = express.Router()

router.post("/signup",signupSellerController);
router.get("/refresh",refreshSellerTokenController)
router.get("/profile", getSellerProfileController);

export default router