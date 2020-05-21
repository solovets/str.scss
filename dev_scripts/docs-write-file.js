const fs = require('fs');

function docsWriteFile(filename, filecontent) {
    fs.writeFile(filename, filecontent, function(error) {
        if(error) throw error;
        console.log(filename + ' updated');
    });
}

module.exports = docsWriteFile;
