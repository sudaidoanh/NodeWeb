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
app.post('/upload', (req, res) => {
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
var fs = require('fs');

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
        <form action="/upload" method="post">
            name: <input type="name" name="name"><br>
            student code: <input type="number" name="id"><br>
            <input type="submit" name="btn-submit" value="submit">
        </form>`
    );
    return res.end();
}).listen(8080);