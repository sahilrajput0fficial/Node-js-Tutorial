import http from 'http';
import fs from 'fs';
import querystring from 'querystring';
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html'})
    console.log(req.url);
    
    if(req.url=='/'){
        fs.readFile('html/newsletter.html',"utf-8",(err,data)=>{
            if(err){
                res.statusCode=500;
                res.write("Error in loading file");
                res.end();
            }
            else{
                res.write(data);
                res.end();
            }
        })
        
    }
    else if(req.url=="/submit-news" && req.method=="POST"){
        res.write("Form Submitted Successfully");
        let dataBody =[];
        req.on("data",(chunk)=>{
            dataBody.push(chunk);

        });
        req.on("end",()=>{
            let data = 
               querystring.parse(Buffer.concat(dataBody).toString());
            console.log(data);
            
            
            //fs.writeFileSync("text/"+data.email+".txt",JSON.stringify(data)); //suync way to create file
            fs.writeFile(`text/${data.email}`,JSON.stringify(data),(err)=>{
                if(err){
                    console.log(`file not created due to ${err}`);

                }
                
            
            })
            res.write(`<p>Email:${data.email}</p>`) 
            res.end();          
        
        })

    }
    else if(req.url=="/signup"){
        fs.readFile("text/")
    }
}).listen(4100);