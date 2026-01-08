import mongoose from "mongoose";
const pincodeSchema = new mongoose.Schema({
  pincode: {
    type: Number,
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
  pincode: Number,
  region: String,
  priority: {
    type: Number,
    default: 1
  },
  active: {
    type: Boolean,
    default: true
  }
});

export const warehouseModel = mongoose.model("warehouse", warehouseSchema);
export const pincodeModel = mongoose.model("pincode", pincodeSchema);
