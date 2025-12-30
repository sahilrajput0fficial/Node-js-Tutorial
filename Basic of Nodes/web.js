import http from 'http';
import fs from 'fs';
import querystring from 'querystring';
const port = 3500;
http.createServer((req, res) => {
    res.writeHead(200,{"Content-Type":"text/html"});
    console.log(req.url);
    if(req.url=="/"){
        res.write(`
            <form action="/submit" method="POST">
                Name: <input type="text" name="name"><br>
                Age: <input type="text" name="age"><br>
                <button type="submit">Submit</button>
            </form>
        `);
        res.end();
    
    }else if (req.url=="/submit" && req.method==="POST"){
        res.write("Form submitted successfully!");
        let dataBody = [];
        req.on("data",(chunk)=>{
            dataBody.push(chunk);
        })
        let readData = null;
        req.on("end",()=>{
            let parsedData = Buffer.concat(dataBody).toString();
            readData = JSON.stringify(querystring.parse(parsedData));
            let read = JSON.parse(readData);
            console.log(readData);
            res.write(`<p>Username : ${read.name}</p><p>Age : ${read.age}</p>`);
            res.end();
            
            
        })
        
        
        //
        //console.log(readData);
        
        
    }
}).listen(port);