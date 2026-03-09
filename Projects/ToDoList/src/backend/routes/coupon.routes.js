import express from "express"
import { getCouponStatusController } from "../controllers/coupon.controller.js";
const router = express.Router();


router.get("/verify/:coupon", getCouponStatusController);


export default router;