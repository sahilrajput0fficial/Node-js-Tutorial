import { couponVerify } from "../services/coupon.services.js";

export const getCouponStatusController = async (req, res) => {
  try {
    const { coupon } = req.params;

    if (!coupon) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required",
      });
    }
    const response = await couponVerify(coupon);
    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Invalid Input",
    });
  }
};
