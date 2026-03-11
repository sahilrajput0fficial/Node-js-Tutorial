import { placeOrder } from "../services/order.services.js";
import { getUserOrders, getOrderById, updateOrderStatus, cancelOrder, getAllOrders } from "../services/order.services.js";
export const placeOrderController = async (req, res) => {
  const orderData = req.body;
  orderData.user = req.user.userId;
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

export const getOrderByUserController = async (req, res) => {
  const userId = req.user.userId;
  try {
    const orders = await getUserOrders(userId);
    res.status(200).json({
      success: true,
      orders: orders,
      message: "Orders fetched Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Sorry! Currently the server is down",
    });
  }
};

export const getOrderByIdController = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch order",
    });
  }
};

export const updateOrderStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await updateOrderStatus(req.params.id, status);
    res.status(200).json({
      success: true,
      order: order,
      message: "Order status updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to update order status",
    });
  }
};

export const cancelOrderController = async (req, res) => {
  try {
    const order = await cancelOrder(req.params.id, req.user.userId);
    res.status(200).json({
      success: true,
      order: order,
      message: "Order cancelled successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to cancel order",
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({
      success: true,
      orders: orders,
      message: "All orders fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch orders",
    });
  }
};
