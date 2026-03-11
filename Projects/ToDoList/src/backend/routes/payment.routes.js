import express from "express";
import { startPayment } from "../controllers/payment.controller.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
const router = express.Router();

router.post("/start-payment", authenticateJWT, startPayment);

export default router;

