import mongoose from "mongoose";
export const variantsSchema = new mongoose.Schema({
    color : String , 
    colorCode : String , 
    images : [String],
    price : Number , 
    stock : Number , 
    sku : String

})
export const ProductSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: String,
  description: String,
  metatitle: String ,
  rating : Number , 
  prop : [String],
  variants: [variantsSchema],
});
export const ProductModel = mongoose.model("products",ProductSchema)