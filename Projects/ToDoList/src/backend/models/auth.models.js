import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    phone : String,
    role:{
        type:String, 
        default:"user",
        enum :["user","admin","superadmin","seller"]
    }

})



export const userModel = mongoose.model("users",userSchema)