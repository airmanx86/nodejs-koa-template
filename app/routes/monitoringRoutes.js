'use strict';

const koaRouter = require('koa-router');

function monitoringRoutes() {
    const router = koaRouter();

    router.get('/liveness', function* livenessHandler() {
        this.body = 'I am alive!';
    });

    return router;
}

module.exports = monitoringRoutes;
