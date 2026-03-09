import { couponModel } from "../models/coupons.models.js";

export async function couponVerify(coupon) {
  if (!coupon) {
    throw new Error("Coupon code is required");
  }

  const getCoupon = await couponModel.findOne({ code: coupon });

  if (!getCoupon) {
    throw new Error("Coupon not found");
  }

  if (!getCoupon.isActive) {
    throw new Error("Coupon is inactive");
  }
  const now = new Date();
  if (
    getCoupon.end_date &&
    getCoupon.end_date < now &&
    getCoupon.start_date &&
    getCoupon.start_date >= now
  ) {
    throw new Error("Coupon expired");
  }

  return getCoupon;
}
