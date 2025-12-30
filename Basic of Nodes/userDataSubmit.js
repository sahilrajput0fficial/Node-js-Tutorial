import fs from "fs";
import querystring from "querystring"
function userDataSubmit(req,res) {
    let body = [];
    req.on("data",(chunk)=>{
        body.push(chunk);
    });
    req.on("end",()=>{
        const parsedData = querystring.parse(Buffer.concat(body).toString());
        console.log(parsedData);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`Input Data : <span style="color:red"><b>${parsedData.data}</b></span>`);
        
    });
    
    
}


export default userDataSubmit;