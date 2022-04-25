var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(q.pathname);
}).listen(8080);