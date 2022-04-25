
var fs = require('fs');
fileData = '01_kiemtraSNT.html'

fileData = fs.openSync(fileData);
console.log('File data: ', fileData);

fs.close(fileData, (err) => {
    if (err) 
        console.error('Failed to close file', err);
    else {
        console.log("\nFile Closed successfully");
    }
});