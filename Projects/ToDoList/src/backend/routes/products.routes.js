import {
  addProductData,
  getProductDataBySlug,
  getAllproducts,
} from "../controllers/product.controller.js";
import { authenticateSeller,  } from "../middlewares/authentiateSeller.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import express from "express";

const router = express.Router();

router.get("/get/:slug",getProductDataBySlug);

router.post("/add", authenticateJWT, authenticateSeller, addProductData);

router.get("/",getAllproducts);



export default router;
