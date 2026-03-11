import axios from "axios";
import jwt from "jsonwebtoken";
import { userModel } from "../models/auth.models.js";

const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = "http://localhost:5000/google/callback";
const GOOGLE_OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export async function googleOAuth(req, res) {
  const state = "some_state";
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_CALLBACK_URL)}&access_type=offline&response_type=code&state=${state}&scope=${encodeURIComponent(scopes)}`;
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
}

export async function googleOAuthCallback(req, res) {
  try {
    const { code } = req.query;
    if (!code) {
      return res
        .status(400)
        .json({ message: "Authorization code not provided" });
    }
    // Exchange code for tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: GOOGLE_CALLBACK_URL,
      },
    );

    const { access_token, id_token } = tokenResponse.data;

    // Get user info from Google
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const googleUser = userInfoResponse.data;

    // Check if user exists
    let user = await userModel.findOne({ googleId: googleUser.id , email: googleUser.email });

    if (!user) {
      // Create new user
      user = new userModel({
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        email: googleUser.email,
        googleId: googleUser.id,
        profilePicture: googleUser.picture,
        isVerified: googleUser.verified_email,
      });
      await user.save();
    }

    // Generate JWT tokens
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

    // Set refresh token in cookie
     res.cookie("refreshToken", refreshToken, {
       httpOnly: true,
       sameSite: "lax",
       secure: false,
       maxAge: 7*24*60*60*1000,
     });
     res.cookie("accessToken",accessToken,{
        httpOnly:true,
        sameSite : "lax",
        secure :false,
        maxAge: 60*60*1000
     })

    // Redirect to frontend with access token
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/success`,
    );
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
}
