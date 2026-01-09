import express from "express"
import cors from "cors"
import categoryRoutes from "./routes/category.routes.js"
import productRoutes from "./routes/products.routes.js"
import { createColor, getColors } from "./controllers/color.controller.js"
import { addInventory, addPincode, addWarehouse, checkAvailability } from "./controllers/delivery.controller.js"
export const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/category",categoryRoutes)

app.use("/api/products",productRoutes);



///development Routes
app.get("/api/check",checkAvailability)
app.get("/api/colors",getColors);
app.get("/api/colors/cr", createColor);
app.get("/api/pincode/cr",addPincode)
app.get("/api/wh/cr", addWarehouse);
app.get("/api/in/cr", addInventory);







