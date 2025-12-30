

///this is path module 
import path from 'path'

const file = "html/web.html"
const pathf = (path.basename(file));
const dir = (path.dirname(file));
console.log(path.extname(file)
);


console.log(path.delimiter)
console.log(path.isAbsolute(file));

console.log(path.resolve(dir,pathf));



/// they are global const
console.log(__dirname+__filename)