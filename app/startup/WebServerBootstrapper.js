'use strict';

const compress = require('koa-compress');
const fs = require('fs');
const http = require('http');
const https = require('https');
const lusca = require('koa-lusca');

function setupCompression(app) {
    app.use(compress());
}

function setupSecurity(app) {
    app.use(lusca({
        csrf: false,
        csp: false,
        xframe: 'SAMEORIGIN',
        p3p: false,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
        },
        xssProtection: true,
    }));
}

function startServer(app, useHttps) {
    if (useHttps) {
        const httpsOptions = {
            key: fs.readFileSync(process.env.HTTPS_KEY_PATH),
            cert: fs.readFileSync(process.env.HTTPS_CERT_PATH),
        };

        const httpsServer = https.createServer(httpsOptions, app.callback());
        httpsServer.listen(process.env.HTTPS_PORT);
    } else {
        const httpServer = http.createServer(app.callback());
        httpServer.listen(process.env.HTTP_PORT);
    }
}

const WebServerBootstrapper = {
    setup(app) {
        setupSecurity(app);
        setupCompression(app);
    },
    serve(app, useHttps) {
        startServer(app, useHttps);
    },
};

module.exports = WebServerBootstrapper;
