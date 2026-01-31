import mongoose from "mongoose";
import slugify from "slugify";

const sellerSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    lName: {
      type: String,
      trim: true,
      index: true,
    },
    storeName : {
      type: String,
      unique :true
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    password: {
      type: String,
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
    role : {
      type : String,
      default : 'seller'
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
sellerSchema.pre("validate", async function () {
  const name = this.fName + this.lName;
  if (!this.slug) {
    this.slug = slugify(name, {
      lower: true,
      strict: true
    });
  }
});
export const SellerModel = mongoose.model("sellers", sellerSchema);