import { placeOrder } from "../services/order.services.js";
export const placeOrderController = async (req, res) => {
  const orderData = req.body;
  try {
    const response = await placeOrder(orderData);
    res.status(200).json({
      success: true,
      message: "Order placed Successfully",
      response: response,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Sorry we cannot process your order due to ${err}`,
    });
  }
};
