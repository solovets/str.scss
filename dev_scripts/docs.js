const sassdoc = require('sassdoc');
const functions = require('./docs-functions');
const fs = require('fs');
const pkg = require('../package');
const docsFileWrite = require('./docs-write-file');

sassdoc.parse([
    './_str.scss', './functions/*.scss'
], {
    verbose: true,
    display: {
        access: ['public']
    }
}).then((data) => {
    const result = {};
    data.forEach((item) => {
        result[item.context.name] = item;
    });

    let contents = '# ' + pkg.name + '\n\n' + pkg.description + '\n\n* * * *\nContents:\n\n';
    let content = '\n* * * *\n\n';
    let tests = '@import "../str";\n\n';

    functions.forEach((item) => {

        let descriptionData = result[item].description.split('\n');
        let link = descriptionData[0];
        let description = descriptionData[1];
        let alias = descriptionData.length > 2 ? descriptionData[2] : false;

        if (result[item].access === 'public') {
            // Create anchor for Contents section
            contents +=
                '+ [' +
                result[item].context.name +
                '](' +
                link.replace(/[\[\]\(\)\$\,=>]/g, '').replace(/\s/g, '-') + ') ' +
                result[item] .description.split('\n')[1] + '\n';

            // Create title and add short description
            content += '## ' + link.replace(/^#/, '') + '\n\n' + description + '\n\n';

            // Add information if function is an alias
            if (alias) {
                content += '_' + alias + '_\n\n';
            }

            // Describe arguments
            if (result[item].parameter.length) {
                content +=
                    '| Argument        | Type     | Required | Default |\n' +
                    '| --------------- | -------- | -------- | ------- |\n';

                result[item].parameter.forEach(param => {
                    content += '| ' + param.name + ' | ' + param.type + ' | ' +
                        (param.hasOwnProperty('default') ? '`-`': '`+`') + ' | ' +
                        (param.hasOwnProperty('default') ? param.default: '`-`') + ' |\n';
                });

                content += '\n';
            }

            // Add type of function return
            content += '**return** `' + result[item].return.type + '`\n\n';

            // Add example
            if (result[item].hasOwnProperty('example')) {
                content += '**Example**\n\n```scss\n' + result[item].example[0].code + '\n```\n\n';
            }

            // Add Error handling
            if (result[item].return.hasOwnProperty('description')) {
                content += '***Errors handling***\n\nArguments to be checked: `' + result[item].return.description.split(' ## ')[0] + '`.\n\n';
                content += 'In case of error and when `$str-scss-strong-type-check` is set to `false` function returns `' + result[item].return.description.split(' ## ')[1] + '`.\n\n';
            }
        }

        // Create tests
        tests += '@debug(\'-----------------------------------\');\n@debug(\'';
        tests += result[item].access + ' ' + result[item].context.type + ' ' + result[item].context.name + '\');\n\n';
        if (result[item].hasOwnProperty('example')) {
            let code = result[item].example[0].code.split('\n');
            code.forEach(example => {
                if (/^@debug/.test(example)) {
                    tests += '@debug("' + example.replace(/@debug\s/g, '') + '");\n';
                    tests += example + '\n\n';
                }
            });
        } else {
            tests += '@debug(\'WARNING! ' + result[item].context.name.toUpperCase() + ' DOES NOT HAVE TEST\');\n\n';
        }
    });

    const install = '\n* * * *\n\n' + fs.readFileSync('./dev_scripts/_install.md', 'utf8');

    docsFileWrite('README.md', contents + install + content);
    docsFileWrite('./test/test.scss', tests);

});
