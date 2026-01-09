import mongoose from "mongoose";

const pincodeSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  city: String,
  state: String,
  region: {
    type: String,
    enum: ["North", "South", "East", "West", "Central"],
  },
  serviceable: {
    type: Boolean,
    default: true,
  },
  codAvailable: {
    type: Boolean,
    default: true,
  },
  baseEtaDays: {
    type: Number,
    default: 2,
  },
});

const warehouseSchema = new mongoose.Schema({
  name: String,
  pincodes: [String],
  regions: [String],
  priority: {
    type: Number,
    default: 1
  },
  active: {
    type: Boolean,
    default: true
  }
});


const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  variantId : mongoose.Schema.Types.ObjectId,
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "warehouse",
  },
  stock: Number,
});



export const warehouseModel = mongoose.model("warehouse", warehouseSchema);
export const pincodeModel = mongoose.model("pincode", pincodeSchema);
export const inventoryModel =  mongoose.model("Inventory", inventorySchema);


