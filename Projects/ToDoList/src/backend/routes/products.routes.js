import {
  addProductData,
  getProductDataBySlug,
  getAllproducts,
} from "../controllers/product.controller.js";
import express from "express";

const router = express.Router();

router.get("/get/:slug",getProductDataBySlug);

router.post("/add", addProductData);

router.get("/",getAllproducts);



export default router;
