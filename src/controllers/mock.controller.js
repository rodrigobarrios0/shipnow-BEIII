import mockService from '../services/mock.service.js';

class MockController {
    getMockUsers(req, res, next) {
        try {
            const users = mockService.generateUsers(
                req.query.quantity ?? 10
            );

            res.status(200).json({
                status: 'success',
                quantity: users.length,
                payload: users
            });
        } catch (error) {
            next(error);
        }
    }

    getMockOrders(req, res, next) {
        try {
            const orders = mockService.generateOrders(
                req.query.quantity ?? 10
            );

            res.status(200).json({
                status: 'success',
                quantity: orders.length,
                payload: orders
            });
        } catch (error) {
            next(error);
        }
    }

    async generateData(req, res, next) {
        try {
            const { users, orders, deliveries } = req.body;

            const result = await mockService.generateData(
                users,
                orders,
                deliveries
            );

            res.status(201).json({
                status: 'success',
                message: 'Datos de prueba generados correctamente.',
                payload: result
            });
        } catch (error) {
            next(error);
        }
}
}

export default new MockController();