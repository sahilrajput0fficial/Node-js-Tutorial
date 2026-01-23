import "./bootstrap.js";
import { app } from "./app.js";
import connectDb from "./config/db.js";
connectDb();
// import path from "path"
// import fs from "fs"

// const envpath = path.resolve("",".env")
// let data = fs.readFileSync(envpath,"utf-8")
// data = data.split("\n")
// const result={}
// data.forEach((elem,idx) => {
//     console.log(`${elem}`);
//     let [val , data ]=elem.split("=")
//     result[val.trim("\r")] = data.trim("\r");
// });
// const PORT = result.PORT

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.log("PORT not valid");
  } else {
    console.log(`Successfully run on ${PORT}`);
  }
});
