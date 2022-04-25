var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    console.log(q.host);
    console.log(q.pathname); 
    console.log(q.search); 
    //Go to localhost:8080/1952711doanh?tuoi=18
}).listen(8080);

