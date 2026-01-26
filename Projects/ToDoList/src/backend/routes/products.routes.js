import {
  addProductData,
  getProductDataBySlug,
  getAllproducts,
  getSellerProduct
} from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/authentiateSeller.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { upload } from "../middlewares/uploadProductImages.js";
import express from "express";

const router = express.Router();

router.get("/get/:slug", getProductDataBySlug);

router.post(
  "/add",
  authenticateJWT,
  authenticateSeller,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "variantImages", maxCount: 50 },
  ]),
  addProductData,
);

router.get("/", getAllproducts);
router.get("/sellerProducts",authenticateJWT,authenticateSeller,getSellerProduct);

export default router;
