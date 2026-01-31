import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SellerModel } from "../models/seller.models.js";

export const signupSellerController = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.json({
      message: "Data Missing",
    });
  }
  try {
    const data = req.body;
    //console.log(data.password);
    const hashed = await bcrypt.hash(data.password, 10);
    const ifexists = await SellerModel.findOne({ email: data.email });
    if (ifexists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        type: "error",
      });
    }
    const nameArray = data.name.split(" ");
    const user = {
      fName: nameArray[0],
      lName: nameArray[1] || " ",
      storeName : data.storeName,
      email: data.email,
      password: hashed,
      "created At": new Date(),
    };
    const inserted = await SellerModel.create(user);
    
    const payload = {
      sellerId: inserted._id,
      email: inserted.email,
      role: inserted.role,
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
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 15 * 60 * 1000,
    });
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: inserted,
      token : accessToken
      
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
export const refreshSellerTokenController = (req, res) => {
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
                sellerId : decoded.sellerId , 
                email : decoded.email , 
                role : decoded.role
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn : "1h"}
        );
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          maxAge: 15 * 60 * 1000,
        });
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





export const getSellerProfileController = async(req,res,next)=>{
    try{
        const userId = req.sellerId;
        const user = await SellerModel.findById(userId);
        console.log(user);
        
        res.status(200).json({
            message:"User Profile fetched successfully",
            user:user
        })

    }catch(err){
        next(err);
    }
}