import { userModel } from "../models/auth.models.js";
import jwt from "jsonwebtoken";
import { register, loginUser, getProfile, getStaff, refreshTokenService } from "../services/auth.services.js";
export const signupController = async (req, res) => {
  if (!req.body) {
    return res.json({
      message: "Data Missing"
    })
  }
  try {
    const user = await register(req.body)
    res.status(201).json({
      message: "User registered successfully",
      type: "success",
      user: user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
export const loginController = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).json({
        message: "Details Missing"
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
    const { accessToken, refreshToken, user } = await loginUser(email, password);
    if (!user) {
      res.status(400).json({
        message: "Invalid Credentials",
        error: "Bad Request",
      });
      return;
    }
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV == "production",
      maxAge: 10 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful",
      token: accessToken,
    });

  } catch (err) {
    next(err);
  }
}
export const getProfileController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await getProfile(userId);
    res.status(200).json({
      message: "User Profile fetched successfully",
      user: user
    })
  } catch (err) {
    next(err);
  }
}

export const getStaffController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await getStaff(userId);
    res.status(200).json({
      message: "Staff Profile fetched successfully",
      user: user,
    });
  } catch (err) {
    next(err);
  }
}

export const refreshTokenController = async (req, res) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).json({
      message: "Refresh Token missing",
    });
  }
  try {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = await refreshTokenService(refreshToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV == "production",
      maxAge: 10 * 60 * 60 * 1000,
    })
    res.status(200).json({
      message: "Access Token refreshed successfully",
      token: accessToken,
    });

  }
  catch (err) {
    return res.status(400).json({
      message: "Invalid Refresh Token",
    })
  }
}





