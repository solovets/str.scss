const pkg = require('../../package');
const compare = require('compare-versions');
const fs = require('fs');
const writeFile = require('./write-file');
const gist = require('./gist');

module.exports = function (args, keywords) {

    const staticKeywords = [
        'scss',
        'string'
    ];

    let nextVersion = '';

    args.forEach(arg => {
        if (/^version=/.test(arg)) {
            nextVersion = arg.split('=')[1];
        }
    });

    if (compare.compare(nextVersion, pkg.version, '>') && compare.validate(nextVersion)) {
        pkg.version = nextVersion;
        pkg.keywords = [...staticKeywords, ...keywords];

        writeFile('./package.json', JSON.stringify(pkg, null, 4), gist);
    }

};
