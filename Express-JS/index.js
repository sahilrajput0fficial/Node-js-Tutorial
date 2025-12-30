import mongoose from "mongoose";
import express from "express";
import studentModel from "./model/studentModel.js";
const app = express();
app.use(express.json())
await mongoose.connect('mongodb://localhost:27017/students').then(()=>{
    console.log("DB connected");
    
})
app.get("/api/user-list",async(req,res)=>{
    const studentData = await studentModel.find();
    console.log(studentData)
    res.send({studentData})

})


app.post("/save",async(req,res)=>{
    try{
        // const {name , age , email , user_id } 


        
    }catch(error){

    }
    
})


app.listen(3500);