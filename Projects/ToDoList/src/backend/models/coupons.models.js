import mongoose from "mongoose";

export const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  discount_type: {
    type: String,
    enum: ["percentage", "fixed"],
  },
  discount_value: Number,

  min_order_amount: {
    type: Number,
    default: 0,
  },

  max_order_amount: {
    type: Number,
    default: 0,
  },
  usage_limit: {
    type: Number,
  },
  usage_per_user: {
    type: Number,
    default: 1,
  },

  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  created_At: Date,
});

export const CouponUsageSchema = new mongoose.Schema({
  coupon_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coupons",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
    required: true,
  },
  used_at: Date,
});

export const CouponProducts = new mongoose.Schema({
  coupon_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coupons",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
});

export const CouponCategory = new mongoose.Schema({
  coupon_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coupons",
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
});

export const couponModel = mongoose.model("coupons", CouponSchema);
export const couponUsageModel = mongoose.model(
  "coupons_usage",
  CouponUsageSchema,
);
export const couponProdModel = mongoose.model(
  "coupons_product",
  CouponProducts,
);
export const couponCatModel = mongoose.model(
  "coupons_category",
  CouponCategory,
);
