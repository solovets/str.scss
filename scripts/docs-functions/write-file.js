const fs = require('fs');

function writeFile(filename, filecontent) {
    fs.writeFile(filename, filecontent, function(error) {
        if(error) throw error;
        console.log(filename + ' updated');
    });
}

module.exports = writeFile;
