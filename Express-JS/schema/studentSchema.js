import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  employee_id: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

export default studentSchema;