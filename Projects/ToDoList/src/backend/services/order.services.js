import { isValid } from "../helper/creditcardverify.js";
import { OrderModel } from "../models/order.models.js";

const paymentMethod = {
  upi: "upi",
  card: "card",
  cod: "cod",
};

export const placeOrder = async (orderData) => {
  if (orderDataVerify(orderData) && (await paymentDetailsVerify(orderData))) {
    console.log("Order verified successfully");

    // Create new order
    const newOrder = new OrderModel({
      user: orderData.user.trim(),
      firstName: orderData.firstName.trim(),
      lastName: orderData.lastName.trim(),
      mobile: orderData.mobile,
      email: orderData.email.trim(),
      address: orderData.address.trim(),
      locality: orderData.locality.trim(),
      landmark: orderData.landmark.trim(),
      city: orderData.city.trim(),
      state: orderData.state.trim(),
      pincode: orderData.pincode.trim(),
      paymentMethod: orderData.paymentMethod.trim(),
      upi: orderData.upi.trim(),
      paymentStatus:
        orderData.paymentMethod === "cod" ? "Pending" : "Completed",
      cartItems: orderData.cartItems.map((item) => ({
        product: item._id || item.id,
        name: item.name.trim(),
        image: item.image || (item.images && item.images[0]),
        price: item.price,
        quantity: item.qty || item.quantity || 1,
      })),
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      discount: orderData.discount,
      total: orderData.total,
      status: "Processing",
    });

    const savedOrder = await newOrder.save();
    return savedOrder;
  }

  throw new Error("Order validation failed");
};

export const orderDataVerify = (data) => {
  console.log(data);
  if (
    !data.firstName ||
    !data.mobile ||
    !data.address ||
    !data.city ||
    !data.state ||
    !data.pincode
  ) {
    throw new Error("User personal data not complete");
  }

  return true;
};
export async function paymentDetailsVerify(orderData) {
  const payment_method = orderData.paymentMethod;
  return true;
}

export const getUserOrders = async (userId) => {
  try {
    const orders = await OrderModel.find({ user: userId }).sort({
      createdAt: -1,
    });
    return orders;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw new Error(`Failed to fetch all orders: ${error.message}`);
  }
};

export const getOrderById = async (orderId) => {
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    throw new Error(`Failed to fetch order: ${error.message}`);
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const validStatuses = ["Pending", "Processing", "Dispatched", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }
};

export const cancelOrder = async (orderId, userId) => {
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.user.toString() !== userId) {
      throw new Error("Unauthorized: You can only cancel your own orders");
    }
    if (order.status !== "Processing") {
      throw new Error("Order can only be cancelled while it is still Processing");
    }
    order.status = "Cancelled";
    await order.save();
    return order;
  } catch (error) {
    throw new Error(`Failed to cancel order: ${error.message}`);
  }
};
