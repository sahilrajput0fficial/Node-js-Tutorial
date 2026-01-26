import { userModel } from "../models/auth.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signupController = async (req, res) => {
  if(!req.body){
    return res.json({
        message :"Data Missing"
    })
  }
  try {
    const data = req.body;
    //console.log(data.password);
    const hashed = await bcrypt.hash(data.password, 10);
    console.log(data.password,hashed);
    const ifexists = await userModel.findOne({ email: data.email });
    if (ifexists) {
      return res.status(400).json({
        message: "User already exists",
        type: "error",
      });
    }
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashed,
      "created At": new Date(),
    };
    const inserted = await userModel.create(user);
    res.status(201).json({
      message: "User registered successfully",
      type: "success",
      user: inserted,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
export const loginController = async (req, res,next) => {
    try{
      if(!req.body){
         res.status(400).json({
          message:"Details Missing"
        })
        return;
      }
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({
          message: "Fill all the details",
          error: "Bad Request",
        });
        return;
      }
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.status(400).json({
          message: "Invalid Credentials",
          error: "Bad Request",
        });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({
          message: "Invalid Credentials",
          error: "Bad Request",
        });
        return;
      }
      const payload = {
        userId: user._id,
        email: user.email,
        role: user.role,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
        expiresIn: "7d",
      });
        res.cookie("refreshToken", refreshToken, {
         httpOnly: true,
         sameSite: "lax",
         secure:false,
         maxAge: 10 * 60 * 60 * 1000
       });

      res.status(200).json({
        message: "Login Successful",
        token: accessToken,
      });
     
    }catch(err){
        next(err);
    }
}
export const getProfileController = async(req,res,next)=>{
    try{
        const userId = req.user.userId;
        const user = await userModel.findById(userId);
        console.log(user);
        
        res.status(200).json({
            message:"User Profile fetched successfully",
            user:user
        })

    }catch(err){
        next(err);
    }
}

export const getStaffController = async(req,res,next)=>{
    try {
      const userId = req.user.userId;
      const user = await userModel.findById(userId);
      console.log(user);

      res.status(200).json({
        message: "Staff Profile fetched successfully",
        user: user,
      });
    } catch (err) {
      next(err);
    }
}

export const refreshTokenController = (req, res) => {
    if(!req.cookies.refreshToken){
        return res.status(401).json({
          message: "Refresh Token missing",
        });
    }
    try{
        const refreshToken = req.cookies.refreshToken;
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        const accessToken = jwt.sign(
            {
                userId : decoded.userId , 
                email : decoded.email , 
                role : decoded.role
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn : "1h"}
        );
        res.status(200).json({
          message: "Access Token refreshed successfully",
          token: accessToken,
        });
    }
    catch(err){
        return res.status(400).json({
            message:"Invalid Refresh Token",
        })
    }
}





