import express from "express"
import cors from "cors"
import categoryRoutes from "./routes/category.routes.js"
import productRoutes from "./routes/products.routes.js"
import authRoutes from "./routes/auth.routes.js"
import sellerRoutes from "./routes/sellerAuth.routes.js"
import orderRoutes from "./routes/order.routes.js"
import couponRoutes from "./routes/coupon.routes.js"
import { createColor, getColors } from "./controllers/color.controller.js"
import { addInventory, addPincode, addWarehouse, checkAvailability } from "./controllers/delivery.controller.js"
import { authenticateJWT } from "./middlewares/authenticateJWT.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js"
import cookieParser from "cookie-parser"
import { googleOAuth,googleOAuthCallback } from "./controllers/oauth.controller.js"


export const app = express()
if(process.env.NODE_ENV === "production"){
    pass
}
else{
    const corsOptions = {
      origin: [process.env.FRONTEND_URL,
        process.env.SELLER_URL
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };
    app.use(cors(corsOptions));

    //preflight request handling
    // app.use((req, res, next) => {
    //   if (req.method === "OPTIONS") {
    //     return res.sendStatus(204);
    //   }
    //   next();
    // });

}
app.use(cookieParser());  // used to parse cookies from incoming requests

//app.options("*", cors(corsOptions));(deprecated code for preflight requests)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//<------------------Auth Routes------------------>
app.use("/api/auth",authRoutes)

//<------------------OAuth Google Routes------------------>
app.get("/google",googleOAuth);
app.get("/google/callback",googleOAuthCallback);

//<------------------Category Routes------------------>
app.use("/api/category",categoryRoutes)

//<------------------Product Routes------------------>
app.use("/api/products",productRoutes);


//<------------------Order Routes--------------->
app.use("/api/order",orderRoutes);

//<--------------Coupon Routes----------------->
app.use("/api/coupon", couponRoutes);

//<------------------Seller Auth Routes---------------->
app.use("/api/seller", sellerRoutes);

///development Routes
app.get("/api/check",checkAvailability)
app.get("/api/colors",getColors);
app.get("/api/colors/cr", createColor);
app.get("/api/pincode/cr",addPincode)
app.get("/api/wh/cr", addWarehouse);
app.get("/api/in/cr", addInventory);
app.get("/protected",authenticateJWT,(req,res)=>{
    res.json({message:"Protected Route Accessed"})
    return;
})


app.use(errorMiddleware);
