import http from 'http';

const PORT = 3100;
const userData = [{
    id:1, name:'John Doe', age:30   
},
{
    id:2, name:'Jane Smith', age:25
},
{
    id:3, name:'Sam Johnson', age:40
}];
http.createServer((req,resp)=>{
    resp.writeHead(200,{"Content-Type":"application/json"});
    resp.write(JSON.stringify(userData));
    resp.end();

}).listen(PORT);

