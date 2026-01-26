import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true, 
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    phone: {
      type: String,
    },

    logo: String,
    banner: String,
    description: String,

    businessType: {
      type: String,
      enum: ["individual", "company", "brand"],
      default: "individual",
    },

    gstNumber: String,
    panNumber: String,

    address: {
      line1: String,
      city: String,
      state: String,
      country: {
        type: String,
        default: "India",
      },
      pincode: String,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },

    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    stats: {
      totalProducts: {
        type: Number,
        default: 0,
      },
      totalOrders: {
        type: Number,
        default: 0,
      },
      totalRevenue: {
        type: Number,
        default: 0,
      },
    },

    metaTitle: String,
    metaDescription: String,

    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

export const SellerModel = mongoose.model("sellers", sellerSchema);