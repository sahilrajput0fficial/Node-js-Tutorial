import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
    name : String , 
    email : String , 
    age : Number , 
    user_id : String , 
    createdAt : {
        type : Date , 
        default : Date.now
    },
    updated_at : {
        type : Date , 
        default : Date.now
    } 

})

export default studentSchema;