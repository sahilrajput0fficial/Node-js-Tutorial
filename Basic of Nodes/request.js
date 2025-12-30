import http from 'http';
console.log(process.argv);

http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    
    if(req.url=="/hello"){
        res.end('Hello World');
    }
    else if(req.url=="/"){
        res.end("Welcome to the Home Page");
    }
    else if(req.url=="/sahil"){
        res.end("Welcome Sahil");
    }

}).listen(5174)