const http = require('http');
const fs = require('fs')

//can store server (create variable for server)
const server = http.createServer((req,res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader('Content-Type','text/html');

    // allowing multiple paths
    let path = './views/';
    switch(req.url){
        case '/': 
            path +='index.html';
            res.statusCode = 200;
            break;
        case  '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case  '/about-me':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
            break;    
        default:
            path += '404.html';
            res.statusCode = 404;
            break;

    };

    // send a html file
    fs.readFile(path, (err,data) => {
        if (err){
            console.log(err);
            res.end();
        } else{
            res.end(data);
        }
    })

    //write what content we want to send
        // res.write('<head><lik rel="stylesheet" href="#"></head>');
        // res.write('<p>hello, ninjas</p>');
        // res.write('<p>hello again, ninjas</p>');

    //end response and send to browser
        // res.end();
});

server.listen(3000, 'localhost',()=>{
    console.log('listening for request on port 3000');
});