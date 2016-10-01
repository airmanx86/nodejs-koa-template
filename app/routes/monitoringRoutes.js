'use strict';

const koaRouter = require('koa-router');

function monitoringRoutes() {
    const router = koaRouter();

    router.get('/liveness', function* livenessHandler(next) {
        this.body = 'I am alive!';
        yield next;
    });

    return router;
}

module.exports = monitoringRoutes;
