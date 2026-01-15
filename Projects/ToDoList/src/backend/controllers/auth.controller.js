import { userModel } from "../models/auth.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signupController = async (req, res) => {
  try {
    const data = req.body;
    //console.log(data.password);
    const hashed = await bcrypt.hash(data.password, 10);
    console.log(hashed);
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
};


export const loginController = async (req, res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).json({
                message:"Fill all the details",
                error:"Bad Request"
            
            })
            return;
        }
        const user = await userModel.findOne({email:email});
        if(!user){
            res.status(400).json({
                message:"Invalid Credentials",
                error:"Bad Request"
            })
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({
                message:"Invalid Credentials",
                error:"Bad Request"
            })
            return;
        }
        const payload = {
            userId : user._id,
            email : user.email,
            role : user.role
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"10h"});
        res.status(200).json({
            message:"Login Successful",
            token : token
        })

    }catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}

export const getProfileController = async(req,res)=>{
    try{
        const userId = req.user.userId;
        const user = await userModel.findById(userId);
        console.log(user);
        
        res.status(200).json({
            message:"User Profile fetched successfully",
            user:user
        })

    }catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}

export const getStaffController = async(req,res)=>{
    console.log("Inside stAFF ADMIN");
    
}
