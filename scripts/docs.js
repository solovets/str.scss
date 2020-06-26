const sassdoc = require('sassdoc');
const functionsArr = require('./docs-data/scss-functions').functions;
const aliasesArr = require('./docs-data/scss-functions').aliases;
const fs = require('fs');
const pkg = require('../package');
const createDocs = require('./docs-functions/create-docs');
const createTests = require('./docs-functions/create-tests');
const writeFile = require('./docs-functions/write-file');

sassdoc.parse([
    './_str.scss', './functions/*.scss'
], {
    verbose: true,
    display: {
        access: ['public']
    }
}).then((dataObject) => {

    const HR = '* * * *';
    const BR = '\n';
    const NL = BR + BR;
    const shields = fs.readFileSync('./scripts/docs-data/_shields.md', 'utf8');
    const install = fs.readFileSync('./scripts/docs-data/_install.md', 'utf8');
    const globalSettings = fs.readFileSync('./scripts/docs-data/_global-settings.md', 'utf8');

    let data               = {},
        header             = '';

    // [{...}, {...}, {...}]
    // =>
    // {a: {...}, b: {...}, c: {...}}
    dataObject.forEach((item) => {
        data[item.context.name] = item;
    });

    // Header of Readme file
    header = '# ' + pkg.name + ' ' + shields + BR + pkg.description + NL + HR + NL;

    // contents and description of function
    const functions = createDocs(data, functionsArr, 1);

    // content and description of aliases
    const aliases   = createDocs(data, aliasesArr, 2);

    // tests
    const tests = createTests(data, [...functionsArr, ...aliasesArr]);

    writeFile(
        'README.md',
        header +
        install + BR +
        functions.contents +
        aliases.contents +
        HR + NL +
        globalSettings + BR +
        functions.readme +
        aliases.readme
    );

    writeFile(
        './test/test.scss',
        tests
    );



});
