import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    img : String , 
    title : String
})
export default mongoose.model("categories", CategorySchema);