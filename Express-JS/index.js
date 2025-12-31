import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import studentModel from "./model/studentModel.js";
import multer from "multer";

const app = express()
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'upload')
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)

    }
})

const upload = multer({storage})
app.set("view engine", "ejs");
app.use(cors());

app.use(express.json())
await mongoose.connect('mongodb://localhost:27017/students').then(() => {
    console.log("DB connected");

})

app.get("/",(req,res)=>{
    res.render("form")

})

app.post("/upload",upload.single('file'),(req, res) => {
  console.log("upload file");
  res.json({
    message : "File Uploaded",
    info :req.file
  })
  
});


app.get("/api/user-list", async (req, res) => {
    const studentData = await studentModel.find();
    console.log(studentData)
    res.send({ studentData })

})


app.post("/api/save", async (req, res) => {
    try {
        const { name, age, email, user_id } = req.body;
        if (!name || !email || !user_id || !age) {
            res.status(400).json({
                message: "Field is missing"
            })
            return;
        }


        if (isNaN(age) || age <= 0) {
            res.status(401).json({
                message: "Invalid Age",
            });
            return;
        }
        const user = {
            name: name,
            email: email,
            age: +age,
            user_id: user_id
        }
        const userData = await studentModel.create(user);
        res.status(201).json({
            message: "Record Inserted",
            insertedId: userData.insertedId

        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message

        })

    }

})

app.delete("/api/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({
                message: "ID is missing",
            });
            return;
        }
        const userData = studentModel.findByIdAndDelete(id)
        res.status(201).json({
            message: "Record Deleted",
            deletedID: userData.name + "My name"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }

})

app.put("/api/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const { name, age, email, user_id } = req.body;
        if (!name || !email || !user_id || !age) {
            res.status(400).json({
                message: "Field is missing",
            });
            return;
        }

        if (isNaN(age) || age <= 0) {
            res.status(401).json({
                message: "Invalid Age",
            });
            return;
        }
        const userData = await studentModel.findByIdAndUpdate(id, {
          name,
          age,
          email,
          user_id,
        });
        res.status(201).json({
            message: "Record Updated",
            updatedId: userData._id
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

app.listen(3500);