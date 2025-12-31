import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import studentModel from "./model/studentModel.js";
import multer from "multer";
import session from "express-session";

const app = express()
app.set("view engine", "ejs");
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'upload')
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)

    }
})

const upload = multer({storage})
app.use(session({
    secret : "app"
}))

app.use(cors());
app.use(express.json())
const username = encodeURIComponent("rajpootsahil51_db_user")
const password = encodeURIComponent("Sahil@123");
const cluster = encodeURIComponent("cluster0");
const appName = encodeURIComponent("Cluster0")
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@${cluster}.wftt93m.mongodb.net/students?appName=${appName}`
  )
  .then(() => {
    console.log("DB connected");
  }).catch((e)=>{
    console.log(e);
    

  });

app.get("/",(req,res)=>{
    res.render("form")
})

app.post("/upload",upload.single('file'),(req, res) => {
  console.log("upload file");
  res.setHeader("set-cookie", "name=Sahil");
  res.send(`Logged in 
    <a href="/profile">Profile</a>`);
});
app.post("/profile", upload.single("file"), (req, res) => {
    req.session.data = req.body;
    res.send("Done")
});
app.get("/user",(req,res)=>{
    const data = req.session.data;
    console.log(data);
    res.render("profile",{data:data})
})
app.get("/api/user-list", async (req, res) => {
    const studentData = await studentModel.find();
    console.log(studentData)
    res.send(studentData)

})

app.post("/api/save", async (req, res) => {
    try {
        const { name, age, email, employee_id } = req.body;
        if (!name || !email || !employee_id || !age) {
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
            employee_id: employee_id
        }
        const userData = await studentModel.create(user);
        res.status(201).json({
            message: "Record Inserted",
            insertedId: userData._id ?userData._id: "NULL"

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
        const userData = await studentModel.findByIdAndDelete(id)
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
        
        const { name, age, email, employee_id } = req.body;
        if (!name || !email || !employee_id || !age) {
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
          employee_id,
        },{new:true});
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