import fs from 'fs'
function userForm(req,res){
    fs.readFile("html/web.html","utf-8",(err,data)=>{
        if(err){
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end();
            return;
            
        }
        else{
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);            
        }

    })
    


}
export default userForm;