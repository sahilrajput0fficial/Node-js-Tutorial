import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  ///always take only variant data
  name: String,
  category: CategorySchema,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sellers",
    required: true,
  },
});
export const variantsSchema = new mongoose.Schema({
  color: colorSchema,
  images: [String],
  price: Number,
  stock: Number,
  sku: String,
});