var fs = require('fs');
var express = require('express');
var app = express();

//GET
app.get('/show', (req, res) => {
    fs.readFile('listUser.txt', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

//POST
app.post('/edit', (req, res) => {
    fs.writeFile('listUser.txt', `${req.body}`, function (err) {
        if (err) throw err;
    });
});

//PUT
app.put('/edit', (req, res) => {
    fs.readFile('listUser.txt', function(err, data) {
        var newData = data + `${req.body}`
        fs.appendFile('listUser.txt', newData, function (err) {
            if (err) throw err;
        });
    });
});

//DELETE
app.put('/edit', (req, res) => {
    fs.appendFile('listUser.txt', '', function (err) {
        if (err) throw err;
    });
});
