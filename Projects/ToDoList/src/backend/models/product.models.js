import mongoose from "mongoose";
import { colorSchema } from "./color.models.js";
import { CategorySchema } from "./category.models.js";
import slugify from "slugify";

export const variantsSchema = new mongoose.Schema({
  color: colorSchema,
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
  category: CategorySchema,
  metatitle: String,
  rating: Number,
  prop: [String],
  variants: [variantsSchema],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sellers",
    required : true
  },
});


ProductSchema.pre("validate", async function () {
  console.log(this.name);
  if (!this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true
    });
  }
});
export const ProductModel = mongoose.model("products", ProductSchema);