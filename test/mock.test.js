import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import User from '../src/models/user.model.js';
import Order from '../src/models/order.model.js';
import Delivery from '../src/models/delivery.model.js';

describe('Persistencia de datos mock', function () {
    describe('POST /api/mocks/generateData', function () {
        it('debería guardar datos relacionados en MongoDB', async function () {
            const response = await request(app)
                .post('/api/mocks/generateData')
                .send({
                    users: 3,
                    orders: 5,
                    deliveries: 2
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.deep.include({
                status: 'success',
                message:
                    'Datos de prueba generados correctamente.'
            });

            expect(response.body.payload).to.deep.equal({
                users: 3,
                orders: 5,
                deliveries: 2
            });

            const [
                storedUsers,
                storedOrders,
                storedDeliveries
            ] = await Promise.all([
                User.countDocuments(),
                Order.countDocuments(),
                Delivery.countDocuments()
            ]);

            expect(storedUsers).to.equal(3);
            expect(storedOrders).to.equal(5);
            expect(storedDeliveries).to.equal(2);
        });

        it('debería rechazar más entregas que pedidos', async function () {
            const response = await request(app)
                .post('/api/mocks/generateData')
                .send({
                    users: 3,
                    orders: 2,
                    deliveries: 4
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.equal({
                status: 'error',
                code: 'DELIVERIES_EXCEED_ORDERS',
                statusCode: 400,
                message:
                    'No puede haber más entregas que pedidos.'
            });
        });
    });
});