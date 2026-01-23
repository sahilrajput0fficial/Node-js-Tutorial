import mongoose from "mongoose";
export const variantsSchema = new mongoose.Schema({
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "colors",
    required: true,
  },
  images: [String],
  price: Number,
  stock: Number,
  sku: String,
});
export const ProductSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: String,
  description: String,
  category : { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "categories", 
    required: true 
  },
  metatitle: String ,
  rating : Number , 
  prop : [String],
  variants: [variantsSchema],
});
export const ProductModel = mongoose.model("products",ProductSchema)