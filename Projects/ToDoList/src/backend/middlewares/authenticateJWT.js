import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res,next)=>{
    const authHeader = req.headers;
    console.log(authHeader);
    next();
    

}