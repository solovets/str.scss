module.exports = function (data, names) {

    const BR = '\n';
    const NL = BR + BR;

    let tests = '@import "../str";' + NL;

    names.forEach(name => {
        tests += '@debug(\'-----------------------------------\');' + BR;
        tests += '@debug(\'' + data[name].context.type + ' ' + data[name].context.name + '\');' + BR;

        if (data[name].hasOwnProperty('example')) {
            let code = data[name].example[0].code.split(BR);
            code.forEach(example => {
                if (/^@debug/.test(example)) {
                    tests += '@debug("' + example.replace(/@debug\s/g, '') + '");' + BR;
                    tests += example + NL;
                }
            });
        } else {
            tests += '@warn(\'' + data[name].context.name.toUpperCase() + ' DOES NOT HAVE TEST\');' + NL;
        }
    });

    return tests;
};
