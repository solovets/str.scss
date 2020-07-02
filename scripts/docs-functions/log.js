const chalk = require('chalk');

const log = msg => {
    console.log(
        chalk.green('» ' + msg)
    );
};

const warn = msg => {
    console.log(
        chalk.red('» ' + msg)
    );
};

module.exports = {
    log,
    warn
};
