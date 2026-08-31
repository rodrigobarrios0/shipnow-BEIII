import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Endpoints de soporte', function () {
    describe('GET /api/health', function () {
        it('debería confirmar que la API funciona', async function () {
            const response = await request(app)
                .get('/api/health');

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.include({
                status: 'ok',
                message: 'ShipNow API funcionando'
            });
        });
    });

    describe('GET /api/mocks/mockingusers', function () {
        it('debería generar la cantidad solicitada', async function () {
            const response = await request(app)
                .get('/api/mocks/mockingusers')
                .query({ quantity: 3 });

            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('success');
            expect(response.body.quantity).to.equal(3);
            expect(response.body.payload).to.be.an('array');
            expect(response.body.payload).to.have.lengthOf(3);

            expect(response.body.payload[0]).to.include.keys(
                'name',
                'email',
                'role'
            );
        });

        it('debería rechazar una cantidad negativa', async function () {
            const response = await request(app)
                .get('/api/mocks/mockingusers')
                .query({ quantity: -5 });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'INVALID_MOCK_QUANTITY',
                statusCode: 400
            });

            expect(response.body.message).to.be.a('string');
        });
    });

    describe('GET /api/logger/test', function () {
        it('debería ejecutar los niveles del logger', async function () {
            const response = await request(app)
                .get('/api/logger/test');

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal({
                status: 'success',
                message:
                    'Todos los niveles del logger fueron ejecutados.'
            });
        });
    });

    describe('GET /api/docs/', function () {
        it('debería mostrar Swagger UI', async function () {
            const response = await request(app)
                .get('/api/docs/');

            expect(response.status).to.equal(200);
            expect(response.headers['content-type'])
                .to.include('text/html');
            expect(response.text).to.include('Swagger UI');
        });
    });

    describe('Ruta inexistente', function () {
        it('debería devolver el error uniforme', async function () {
            const response = await request(app)
                .get('/api/ruta-inexistente');

            expect(response.status).to.equal(404);
            expect(response.body).to.deep.equal({
                status: 'error',
                code: 'ROUTE_NOT_FOUND',
                statusCode: 404,
                message: 'Ruta no encontrada.'
            });
        });
    });
});