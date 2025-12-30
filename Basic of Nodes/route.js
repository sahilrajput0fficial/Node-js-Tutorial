// Modules and routes 

import http from "http"
import userForm from "./userForm.js";
import userDataSubmit from "./userDataSubmit.js"

http.createServer((req,res)=>{
    if(req.url == "/" ){
    userForm(req,res);
    return;
    }
    else if(req.url=="/submit" && req.method==="POST"){
        userDataSubmit(req,res);
        

    }

    

}).listen(3500);