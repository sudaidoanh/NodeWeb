var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
        res.write(data);
        return res.end();
        //Go to http://localhost:8080/01_kiemtraSNT.html
    });
}).listen(8080);