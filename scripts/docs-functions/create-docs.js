module.exports = function(data, names, type) {

    const types = {
        1: 'functions',
        2: 'aliases'
    };
    const HR = '* * * *';
    const BR = '\n';
    const NL = BR + BR;
    const title = types[type].slice(0,1).toUpperCase() + types[type].slice(1);

    let contents = '**' + title + '**' + NL;
    let readme = '## ' + title + NL;
    let keywords = [];

    names.forEach((name, index) => {
        if (data.hasOwnProperty(name) && data[name].access === 'public') {

            let descriptionData = data[name].description.split('\n');
            let link = descriptionData[0];
            let description = descriptionData[1];
            let alias = descriptionData.length > 2 ? descriptionData[2] : false;

            // add separator
            if (index > 0) readme += HR + NL;

            contents += ' + [' + data[name].context.name + ']' +
                '(' + link.replace(/[\[\]\(\)\$\,=>]/g, '').replace(/\s/g, '-') + ') ' +
                description + BR;

            // Add function title
            readme += '### ' + link.replace(/^#/, '') + NL;

            // Add function description
            readme += description + NL;

            // Add alias info
            if (alias) readme += '_' + alias + '_' + NL;

            // Describe function arguments
            if (data[name].hasOwnProperty('parameter') && data[name].parameter.length) {
                readme +=
                    '| Argument        | Type     | Required | Default |' + BR +
                    '| --------------- | -------- | -------- | ------- |' + BR;

                data[name].parameter.forEach(param => {
                    readme += '| ' + param.name + ' | ' + param.type + ' | ' +
                        (param.hasOwnProperty('default') ? '`-`': '`+`') + ' | ' +
                        (param.hasOwnProperty('default') ? param.default: '`-`') + ' |' + BR;
                });

                readme += BR;
            }

            // return info
            let returnInfo = data[name].return;

            // return type
            readme += '**return** ' + returnInfo.type + NL;

            // example
            if (data[name].hasOwnProperty('example')) {
                readme +=
                    '**Example**' + NL +
                    '```scss' + BR +
                    data[name].example[0].code + BR +
                    '```' + NL;
            }

            // error handling info
            if (returnInfo.hasOwnProperty('description')) {
                readme +=
                    '***Errors handling***' + NL +
                    'Arguments to be checked: `' + returnInfo.description.split(' ## ')[0] + '`.' + NL +
                    'In case of error and `$str-scss-strong-type-check` is set to `false` function returns `' + returnInfo.description.split(' ## ')[1] + '`.' + NL;
            }


            // add keyword
            keywords.push(
                name.replace(/^str-/, '')
            );


        }
    });

    contents += BR;

    return {
        contents: contents,
        readme: readme,
        keywords: keywords
    };
};
