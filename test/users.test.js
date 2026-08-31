import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Users API', function () {
    describe('GET /api/users', function () {
        it('debería devolver una lista vacía inicialmente', async function () {
            const response = await request(app)
                .get('/api/users');

            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('success');
            expect(response.body.payload).to.be.an('array');
            expect(response.body.payload).to.have.lengthOf(0);
        });
    });

    describe('POST /api/users', function () {
        it('debería crear un usuario válido', async function () {
            const userData = {
                name: 'Usuario de Testing',
                email: 'testing@shipnow.test',
                role: 'user'
            };

            const response = await request(app)
                .post('/api/users')
                .send(userData);

            expect(response.status).to.equal(201);
            expect(response.body.status).to.equal('success');
            expect(response.body.payload).to.include({
                name: userData.name,
                email: userData.email,
                role: userData.role
            });

            expect(response.body.payload).to.have.property('_id');
        });

        it('debería rechazar datos incompletos', async function () {
            const response = await request(app)
                .post('/api/users')
                .send({
                    name: 'Usuario sin email'
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'VALIDATION_ERROR',
                statusCode: 400
            });
        });

        it('debería rechazar un email duplicado', async function () {
            const userData = {
                name: 'Usuario Original',
                email: 'duplicado@shipnow.test',
                role: 'user'
            };

            await request(app)
                .post('/api/users')
                .send(userData)
                .expect(201);

            const response = await request(app)
                .post('/api/users')
                .send({
                    ...userData,
                    name: 'Segundo Usuario'
                });

            expect(response.status).to.equal(409);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'DUPLICATE_EMAIL',
                statusCode: 409
            });
        });
    });

    describe('GET /api/users/:id', function () {
        it('debería consultar un usuario creado', async function () {
            const creationResponse = await request(app)
                .post('/api/users')
                .send({
                    name: 'Usuario Consultable',
                    email: 'consultable@shipnow.test',
                    role: 'driver'
                });

            const userId = creationResponse.body.payload._id;

            const response = await request(app)
                .get(`/api/users/${userId}`);

            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('success');
            expect(response.body.payload._id).to.equal(userId);
            expect(response.body.payload.role).to.equal('driver');
        });

        it('debería rechazar un identificador inválido', async function () {
            const response = await request(app)
                .get('/api/users/id-invalido');

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.equal({
                status: 'error',
                code: 'INVALID_ID',
                statusCode: 400,
                message:
                    'El identificador proporcionado no es válido.'
            });
        });

        it('debería responder 404 si el usuario no existe', async function () {
            const validNonexistentId =
                '507f1f77bcf86cd799439011';

            const response = await request(app)
                .get(`/api/users/${validNonexistentId}`);

            expect(response.status).to.equal(404);
            expect(response.body).to.deep.equal({
                status: 'error',
                code: 'USER_NOT_FOUND',
                statusCode: 404,
                message: 'Usuario no encontrado.'
            });
        });
    });
});