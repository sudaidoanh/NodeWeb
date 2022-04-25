var http = require('http');
var moduleNode = require('./moduleNode');

http.createServer(function(req, res) {
    res.end(moduleNode.dateTime());
}).listen(8080);
