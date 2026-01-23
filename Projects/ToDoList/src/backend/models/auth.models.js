import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Password required only if not Google user
    },
  },
  phone: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "superadmin", "seller"],
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  profilePicture: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export const userModel = mongoose.model("users", userSchema);
