const concat = require('concat-files');
const path = require('path');
const fs = require('fs');

const pkg = require('../package');
const helpers = require('./scss-helpers');
const functions = require('./docs-data/scss-functions');

const files = ['./scripts/_gist.scss'];

for (let i = 0; i < helpers.length; i++) {
    files.push('./helpers/_' + helpers[i] + '.scss');
}

for (let i = 0; i < functions.length; i++) {
    files.push('./functions/_' + functions[i] + '.scss');
}

const gistPath = path.join(process.cwd(), '../str.scss.gist/_str.scss');

let gistIntro = '// ' + pkg.name + ' | v. ' + pkg.version + ' | ' + pkg.license + ' license\n' +
    '// ' + pkg.description + '\n' +
    '//\n' +
    '// Homepage: ' + pkg.homepage + '\n' +
    '// Report an issue: ' + pkg.bugs.url + '\n' +
    '// Author: ' + pkg.author + '\n' +
    '// This file is always up to date.\n\n';

gistIntro += '$str-scss-strong-type-check: false !default;\n' +
    '\n' +
    '@if type-of($str-scss-strong-type-check) != bool {\n' +
    '    @error(\'[str.scss] Global variable `$str-scss-strong-type-check` must be of type bool\');\n' +
    '}\n\n';

fs.writeFile('./scripts/_gist.scss', gistIntro, function (error) {
    if (error) throw error;
    concat(files, gistPath, function(err) {
        if (err) throw err;
        console.log('Gist updated');
    });
});


