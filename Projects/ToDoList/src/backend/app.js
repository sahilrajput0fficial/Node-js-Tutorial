import express from "express"
import cors from "cors"
import categoryRoutes from "./routes/category.routes.js"
import productRoutes from "./routes/products.routes.js"
export const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/category",categoryRoutes)

app.use("/api/products",productRoutes);







