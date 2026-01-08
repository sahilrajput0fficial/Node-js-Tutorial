import mongoose from "mongoose";
const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export default mongoose.model("colors", colorSchema);
