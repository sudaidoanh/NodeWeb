var http = require('http');

http.createServer(function(req, res) {
    res.end('Hello Worldd!')
}).listen(8080);
