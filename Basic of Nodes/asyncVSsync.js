// import { log } from 'console';
// import fs from 'fs';
// console.log("Hello ! This is statement before sync call");
// fs.readFile("text/rajpootsahil52@gmail.com","utf-8",(error,data)=>{
//     if(error){
//         return false;
//     }
//     else{
//         console.log(JSON.parse(data).email);
        
//     }

// }

// )
// console.log("Function Executed");
import { log } from 'console';
import fs from 'fs';
console.log("Hello ! This is statement before async call");
const data = fs.readFileSync("text/rajpootsahil52@gmail.com","utf-8")
console.log(data);

console.log("Function Executed");