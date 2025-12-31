import express from "express"
import nodemailer from "nodemailer"
const app = express()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rajpootsahil51@gmail.com",
    pass: "dmhg uzkz qyza soyi",
  },
});
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.get("/email",(req,res)=>{
    console.log("Mailed");
    res.render("mail")
    

})

app.post("/submit",(req,res)=>{

    const mailOptions = {
      from: "rajpootsahil51gmail.com",
      to: req.body.to,
      subject:req.body.subject,
      text:req.body.message
    };
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            res.send(`opertaion failed ${err}`)

        }
        else{
            res.send("mail send")
        }

    })
    console.log("Email Sent");
    
})

app.listen(3500)