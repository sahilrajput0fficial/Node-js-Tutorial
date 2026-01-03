import { getCategory,addCategory,deleteCategory,updateCategory} from "../controllers/category.controller.js";
import express from "express";

const router = express.Router()
router.get("/",getCategory)
router.post("/add",addCategory)
router.delete("/delete/:id", deleteCategory);
router.put("/update/:id",updateCategory);


export default router