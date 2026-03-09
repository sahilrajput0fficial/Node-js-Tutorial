import express from "express";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { placeOrderController } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place-order", authenticateJWT, placeOrderController)

export default router;
