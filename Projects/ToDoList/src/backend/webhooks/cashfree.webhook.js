import { OrderModel } from "../models/order.models.js";
export const handleWebhook = async (req, res) => {
  const data = req.body;

  const orderId = data.order.order_id;
  const paymentStatus = data.payment.payment_status;

  if (paymentStatus === "SUCCESS") {
    await OrderModel.updateOne(
      { _id: orderId },
      { $set: { paymentStatus: "Completed" } },
    );
  } else {
    await OrderModel.updateOne(
      { _id: orderId },
      { $set: { paymentStatus: "Failed" } },
    );
  }

  res.status(200).send("Webhook received");
};
