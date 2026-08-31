import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Products API', function () {
    describe('POST /api/products', function () {
        it('debería crear un producto disponible', async function () {
            const response = await request(app)
                .post('/api/products')
                .send({
                    name: 'Producto de Testing',
                    description: 'Creado por la suite',
                    price: 1500,
                    stock: 10
                });

            expect(response.status).to.equal(201);
            expect(response.body.status).to.equal('success');
            expect(response.body.payload).to.include({
                name: 'Producto de Testing',
                price: 1500,
                stock: 10,
                status: 'available'
            });

            expect(response.body.payload).to.have.property('_id');
        });

        it('debería crear un producto sin stock', async function () {
            const response = await request(app)
                .post('/api/products')
                .send({
                    name: 'Producto agotado',
                    price: 2000,
                    stock: 0
                });

            expect(response.status).to.equal(201);
            expect(response.body.payload.status)
                .to.equal('out_of_stock');
        });

        it('debería rechazar datos incompletos', async function () {
            const response = await request(app)
                .post('/api/products')
                .send({
                    name: 'Producto sin precio'
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'VALIDATION_ERROR',
                statusCode: 400
            });
        });
    });

    describe('GET /api/products', function () {
        it('debería listar solamente productos disponibles', async function () {
            await request(app)
                .post('/api/products')
                .send({
                    name: 'Producto disponible',
                    price: 1000,
                    stock: 5
                })
                .expect(201);

            await request(app)
                .post('/api/products')
                .send({
                    name: 'Producto agotado',
                    price: 2000,
                    stock: 0
                })
                .expect(201);

            const response = await request(app)
                .get('/api/products');

            expect(response.status).to.equal(200);
            expect(response.body.payload).to.be.an('array');
            expect(response.body.payload).to.have.lengthOf(1);
            expect(response.body.payload[0].name)
                .to.equal('Producto disponible');
        });
    });

    describe('PUT /api/products/:id', function () {
        it('debería cambiar el estado cuando el stock llega a cero', async function () {
            const creationResponse = await request(app)
                .post('/api/products')
                .send({
                    name: 'Producto actualizable',
                    price: 3000,
                    stock: 8
                });

            const productId = creationResponse.body.payload._id;

            const response = await request(app)
                .put(`/api/products/${productId}`)
                .send({
                    stock: 0
                });

            expect(response.status).to.equal(200);
            expect(response.body.payload.stock).to.equal(0);
            expect(response.body.payload.status)
                .to.equal('out_of_stock');
        });
    });

    describe('GET /api/products/:id', function () {
        it('debería responder 404 si el producto no existe', async function () {
            const validNonexistentId =
                '507f1f77bcf86cd799439011';

            const response = await request(app)
                .get(`/api/products/${validNonexistentId}`);

            expect(response.status).to.equal(404);
            expect(response.body).to.deep.equal({
                status: 'error',
                code: 'PRODUCT_NOT_FOUND',
                statusCode: 404,
                message: 'Producto no encontrado.'
            });
        });
    });
});