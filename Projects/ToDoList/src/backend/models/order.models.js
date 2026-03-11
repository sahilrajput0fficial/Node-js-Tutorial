import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

export const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // Personal details
    firstName: { type: String, required: true },
    lastName: { type: String },
    mobile: { type: String, required: true },
    email: { type: String },

    // Shipping Address
    address: { type: String, required: true },
    locality: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },

    // Payment info
    paymentMethod: {
      type: String,
      required: true,
      enum: ["card", "upi", "cod"],
    },
    upi: { type: String },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },

    // Items & Pricing
    cartItems: [orderItemSchema],
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },

    // Fulfillment
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Dispatched",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Processing",
    },
  },
  { timestamps: true },
);

export const OrderModel = mongoose.model("orders", OrderSchema);
