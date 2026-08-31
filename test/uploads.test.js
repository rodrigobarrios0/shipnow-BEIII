import request from 'supertest';
import { expect } from 'chai';
import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import app from '../src/app.js';
import Delivery from '../src/models/delivery.model.js';

describe('File uploads API', function () {
    const uploadedFiles = [];

    afterEach(async function () {
        await Promise.all(
            uploadedFiles.splice(0).map(async (filePath) => {
                try {
                    await unlink(resolve(filePath));
                } catch {
                    
                }
            })
        );
    });

    describe('POST /api/users/:id/documents', function () {
        it('debería cargar un documento para un usuario', async function () {
            const userResponse = await request(app)
                .post('/api/users')
                .send({
                    name: 'Usuario con documento',
                    email: 'documento@shipnow.test',
                    role: 'user'
                })
                .expect(201);

            const userId = userResponse.body.payload._id;

            const response = await request(app)
                .post(`/api/users/${userId}/documents`)
                .field('documentType', 'user_document')
                .attach(
                    'document',
                    Buffer.from('contenido de prueba'),
                    {
                        filename: 'documento-test.pdf',
                        contentType: 'application/pdf'
                    }
                );

            expect(response.status).to.equal(201);
            expect(response.body.status).to.equal('success');
            expect(response.body.message).to.equal(
                'Documento cargado correctamente.'
            );

            expect(response.body.payload.documents)
                .to.be.an('array')
                .with.lengthOf(1);

            const document =
                response.body.payload.documents[0];

            expect(document).to.include({
                originalName: 'documento-test.pdf',
                mimeType: 'application/pdf',
                documentType: 'user_document'
            });

            expect(document).to.have.property('filename');
            expect(document).to.have.property('path');
            expect(document.size).to.be.greaterThan(0);

            uploadedFiles.push(document.path);
        });

        it('debería rechazar una petición sin archivo', async function () {
            const userResponse = await request(app)
                .post('/api/users')
                .send({
                    name: 'Usuario sin archivo',
                    email: 'sinarchivo@shipnow.test',
                    role: 'user'
                })
                .expect(201);

            const userId = userResponse.body.payload._id;

            const response = await request(app)
                .post(`/api/users/${userId}/documents`)
                .field('documentType', 'user_document');

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'FILE_REQUIRED',
                statusCode: 400
            });
        });
    });

    describe('POST /api/deliveries/:id/proof', function () {
        it('debería cargar un comprobante para una entrega', async function () {
            await request(app)
                .post('/api/mocks/generateData')
                .send({
                    users: 5,
                    orders: 2,
                    deliveries: 1
                })
                .expect(201);

            const delivery = await Delivery.findOne();

            expect(delivery).to.not.equal(null);

            const response = await request(app)
                .post(`/api/deliveries/${delivery._id}/proof`)
                .attach(
                    'proof',
                    Buffer.from('comprobante de prueba'),
                    {
                        filename: 'comprobante-test.png',
                        contentType: 'image/png'
                    }
                );

            expect(response.status).to.equal(201);
            expect(response.body.status).to.equal('success');
            expect(response.body.message).to.equal(
                'Comprobante cargado correctamente.'
            );

            const proof = response.body.payload.proof;

            expect(proof).to.include({
                originalName: 'comprobante-test.png',
                mimeType: 'image/png',
                documentType: 'delivery_proof'
            });

            expect(proof).to.have.property('filename');
            expect(proof).to.have.property('path');
            expect(proof.size).to.be.greaterThan(0);

            uploadedFiles.push(proof.path);
        });

        it('debería rechazar una petición sin comprobante', async function () {
            await request(app)
                .post('/api/mocks/generateData')
                .send({
                    users: 5,
                    orders: 2,
                    deliveries: 1
                })
                .expect(201);

            const delivery = await Delivery.findOne();

            const response = await request(app)
                .post(`/api/deliveries/${delivery._id}/proof`);

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'FILE_REQUIRED',
                statusCode: 400
            });
        });
    });
});