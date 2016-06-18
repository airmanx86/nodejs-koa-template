'use strict';

const logger = require('../lib/logging/logger');

const SystemEventHandler = {
    setup() {
        // THE PURPOSE OF THIS EVENT LOGGER IS
        // TO DETECT PROCESS LIFECYCLE EVENTS
        //
        // THIS IS NOT INTENDED AS YOUR ERROR HANDLING STRATEGY
        // IF EXCEPTIONS OCCUR HERE THEN YOUR ERROR HANDLING SHOULD
        // BE IMPROVED IN THE APPROPRIATE PART OF YOUR APPLICATION.
        process.on('uncaughtException', (err) => {
            let errorLog;

            if (err.stack) {
                errorLog = err.stack.toString();
            } else {
                errorLog = err.toString();
            }

            logger.error(`Unhandled exception: ${errorLog}`);
            process.exit(1);
        });

        // If the Node process ends, log such event
        process.on('SIGINT', () => {
            logger.info('Received SIGINT - Process ended');
            process.exit(0);
        });

        // If the Node process ends, log such event
        process.on('SIGTERM', () => {
            logger.info('Received SIGTERM - Process ended');
            process.exit(0);
        });
    },
};

module.exports = SystemEventHandler;
