'use strict';

const winston = require('winston');

const level = process.env.LOG_LEVEL || 'debug';
const transports = [];

transports.push(new winston.transports.Console({
    colorize: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
}));

const logger = new winston.Logger({
    level,
    transports,
});

module.exports = logger;
