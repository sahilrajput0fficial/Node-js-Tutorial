import { userModel } from "../models/auth.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (data) => {
  const existing = await userModel.findOne({ email: data.email });
  if (existing) {
    throw new Error("User already exists");
  }
  const hashed = await bcrypt.hash(data.password, 10);
  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashed,
    "created At": new Date(),
  };
  const inserted = await userModel.create(user);
  if (!inserted) {
    throw new Error("not inserted due to server error");
  }
  const { password, ...userPublic } = user;
  return userPublic;
};

export const loginUser = async (email, password) => {
  const getuser = await userModel.findOne({ email: email });
  if (!getuser) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, getuser.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }
  const payload = {
    userId: getuser._id,
    email: getuser.email,
    role: getuser.role,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });
  const { password: pass, ...user } = getuser.toObject();

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const getProfile = async (id) => {
  const user = await userModel.findById(id).select("-password");
  if (!user) {
    throw new Error("User not Found");
  } else {
    return user;
  }
};

export const getStaff = async (id) => {
  const user = await userModel.findById(id).select("-password");
  if (!user) {
    throw new Error("User not Found");
  } else {
    return user;
  }
};


export const refreshTokenService = async(refreshToken)=>{
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    if(!decoded){
        throw new InvalidTokenError("Invalid Refresh Token",400);
    }
    const accessToken = jwt.sign(
        {
            userId : decoded.userId , 
            email : decoded.email , 
            role : decoded.role
        },
        process.env.JWT_ACCESS_KEY,
        {expiresIn : "1h"}
    );

    return accessToken;


}