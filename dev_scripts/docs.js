const sassdoc = require('sassdoc');
const functions = require('./functions');
const fs = require('fs');
const pkg = require('../package');

sassdoc.parse([
    './_underscore-string.scss', './functions/*.scss'
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

    functions.forEach((item) => {

        if (result[item].access === 'public') {
            let descriptionData = result[item].description.split('\n');
            let link = descriptionData[0];
            let description = descriptionData[1];
            let alias = descriptionData.length > 2 ? descriptionData[2] : false;

            // Create anchor for Contents section
            contents +=
                '+ [' +
                result[item].context.name +
                '](' +
                link.replace(/[\(\)\$\,=>]/g, '').replace(/\s/g, '-') + ') ' +
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
        }
    });

    //console.log(JSON.stringify(result, null, 4));
    //console.log(contents, content);

    fs.writeFile("README.md", contents + content, function(error) {
        if(error) throw error;
        console.log('README.md updated');
    });
});
