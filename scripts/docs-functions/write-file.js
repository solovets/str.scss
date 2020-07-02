const fs = require('fs');
const log = require('./log');

function writeFile(filename, filecontent, callback) {
    fs.writeFile(filename, filecontent, function(error) {
        if(error) throw error;
        log.log(filename + ' updated');
        if (callback) {
            callback()
        }
    });
}

module.exports = writeFile;
