import express from "express"
import cors from "cors"
import categoryRoutes from "./routes/category.routes.js"

export const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/category",categoryRoutes)







