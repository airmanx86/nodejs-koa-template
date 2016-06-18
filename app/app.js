'use strict';

const koa = require('koa');
const koaRouter = require('koa-router');
const koaBodyParser = require('koa-bodyparser');

const monitoringRoutes = require('./routes/monitoringRoutes');

const app = koa();

// tell koa that it is behind a proxy so the x-forwarded headers will be trusted
if (process.env.USE_TRUST_PROXY && process.env.USE_TRUST_PROXY === 'true') {
    app.proxy = true;
}

const rootRouter = koaRouter();
const monitoringRouter = monitoringRoutes();
rootRouter.use(monitoringRouter.routes(), monitoringRouter.allowedMethods());

app
  .use(koaBodyParser())
  .use(rootRouter.routes())
  .use(rootRouter.allowedMethods());

module.exports = app;
