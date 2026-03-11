import express from "express";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { authenticateSeller } from "../middlewares/authentiateSeller.js";
import {
    placeOrderController,
    getOrderByUserController,
    getOrderByIdController,
    updateOrderStatusController,
    cancelOrderController,
    getAllOrdersController,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place-order", authenticateJWT, placeOrderController);
router.get("/all", authenticateJWT, authenticateSeller, getAllOrdersController);
router.get("/", authenticateJWT, getOrderByUserController);
router.get("/:id", authenticateJWT, getOrderByIdController);
router.patch("/:id/status", authenticateJWT, updateOrderStatusController);
router.patch("/:id/cancel", authenticateJWT, cancelOrderController);

export default router;
