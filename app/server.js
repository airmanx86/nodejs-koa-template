'use strict';

process.chdir(__dirname);
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const dotenv = require('dotenv');

// only load the .env file in development environment
if (process.env.NODE_ENV === 'development') {
    dotenv.load();
}

const co = require('co');

const logger = require('./lib/logging/logger');
const SystemEventHandler = require('./startup/SystemEventHandler');
const WebServerBootstrapper = require('./startup/WebServerBootstrapper');
const app = require('./app');

co(function* setup() {
    SystemEventHandler.setup();
    WebServerBootstrapper.setup(app);

    const useHttps = process.env.PROTOCOL ? process.env.PROTOCOL !== 'http' : false;

    WebServerBootstrapper.serve(app, useHttps);

    const runningPort = useHttps ? process.env.HTTPS_PORT : process.env.HTTP_PORT;
    logger.info(`Service started on port ${runningPort} (NODE_ENV: ${process.env.NODE_ENV})`);
}).catch((err) => {
    logger.error('There was an error bootstrapping the service:');
    logger.error(err.stack);

    throw err;
});
