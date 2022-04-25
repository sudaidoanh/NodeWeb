var fs = require('fs');

fs.readFile('./01_kiemtraSNT.html', function(err, data) {
    if(err) throw err;
    console.log('File is opening');
});