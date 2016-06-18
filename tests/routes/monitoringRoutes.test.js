'use strict';

require('mocha');
require('should');

const app = require('../../app/app');
const request = require('supertest').agent(app.listen());
const monitoringRoutes = require('../../app/routes/monitoringRoutes');

describe('Monitoring routes', () => {
    after((done) => {
        // make sure we close the koa app after test
        request.app.close();
        done();
    });

    const router = monitoringRoutes();

    it('should expose 1 route', () => {
        router.stack.length.should.be.eql(1);
    });

    describe('GET /liveness', () => {
        it('should return OK', (done) => {
            request.get('/liveness').expect(200, done);
        });
    });
});
