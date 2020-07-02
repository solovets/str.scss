const concat = require('concat-files');
const path = require('path');
const fs = require('fs');

const pkg = require('../../package');
const functions = require('../docs-data/scss-functions');
const log = require('./log');

module.exports = function() {

    const files = ['./scripts/docs-data/_gist.scss'];

    for (let i = 0; i < functions.helpers.length; i++) {
        files.push('./helpers/_' + functions.helpers[i] + '.scss');
    }

    for (let i = 0; i < functions.functions.length; i++) {
        files.push('./functions/_' + functions.functions[i] + '.scss');
    }

    for (let i = 0; i < functions.aliases.length; i++) {
        files.push('./functions/_' + functions.aliases[i] + '.scss');
    }

    const gistPath = path.join(process.cwd(), '../str.scss.gist/_str.scss');

    const gistIntro = '// ' + pkg.name + ' | v. ' + pkg.version + ' | ' + pkg.license + ' license\n' +
        '// ' + pkg.description + '\n' +
        '//\n' +
        '// Homepage: ' + pkg.homepage + '\n' +
        '// Report an issue: ' + pkg.bugs.url + '\n' +
        '// Author: ' + pkg.author + '\n' +
        '// This file is always up to date.\n\n' +
        '$str-scss-strong-type-check: false !default;\n\n' +
        '@if type-of($str-scss-strong-type-check) != bool {\n' +
        '    @error(\'[str.scss] Global variable `$str-scss-strong-type-check` must be of type bool\');\n' +
        '}\n\n';

    fs.writeFile('./scripts/docs-data/_gist.scss', gistIntro, function (error) {
        if (error) throw error;
        concat(files, gistPath, function(err) {
            if (err) throw err;
            log.log('GitHub Gist updated');
        });
    });

};


