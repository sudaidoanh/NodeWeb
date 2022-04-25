var port = 8080;
var express = require('express');
var app = express();
var url = require('url');

app.get('/convertVNDtoUSD', (req, res) => {
    var q = url.parse(req.url, true);
    var result = `${(q.query.VND)}` / '22958';
    result = result.toString();
    res.write('conver ' + `${(q.query.VND)}` + ' VND = ' + result + ' USD');
    res.end();
}).listen(8080);

//Go to http://localhost:8080/convertVNDtoUSD?VND= ... 