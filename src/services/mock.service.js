import { generateMockUsers } from '../mocks/user.mock.js';
import { generateMockOrders } from '../mocks/order.mock.js';
import AppError from '../utils/app-error.js';
import userRepository from '../repositories/user.repository.js';
import orderRepository from '../repositories/order.repository.js';
import { generateMockDeliveries } from '../mocks/delivery.mock.js';
import deliveryRepository from '../repositories/delivery.repository.js';
import { USER_ROLES } from '../constants/index.js';

class MockService {
    validateQuantity(quantity) {
        const parsedQuantity = Number(quantity);

        if (
            !Number.isInteger(parsedQuantity) ||
            parsedQuantity <= 0 ||
            parsedQuantity > 100
        ) {
            throw new AppError(
                'La cantidad debe ser un número entero entre 1 y 100.',
                400
            );
        }

        return parsedQuantity;
    }

    generateUsers(quantity = 10) {
        const validQuantity = this.validateQuantity(quantity);

        return generateMockUsers(validQuantity);
    }

    generateOrders(quantity = 10) {
        const validQuantity = this.validateQuantity(quantity);

        return generateMockOrders(validQuantity);
    }

async generateData(
    usersQuantity,
    ordersQuantity,
    deliveriesQuantity
) {
    const validUsersQuantity = this.validateQuantity(usersQuantity);
    const validOrdersQuantity = this.validateQuantity(ordersQuantity);
    const validDeliveriesQuantity =
        this.validateQuantity(deliveriesQuantity);

    if (validDeliveriesQuantity > validOrdersQuantity) {
        throw new AppError(
            'No puede haber más entregas que pedidos.',
            400
        );
    }

    const mockUsers = generateMockUsers(validUsersQuantity);


    mockUsers[0].role = USER_ROLES.DRIVER;

    const createdUsers = await userRepository.insertMany(mockUsers);

    const userIds = createdUsers.map((user) => user._id);

    const driverIds = createdUsers
        .filter((user) => user.role === USER_ROLES.DRIVER)
        .map((user) => user._id);

    const mockOrders = generateMockOrders(
        validOrdersQuantity,
        userIds
    );

    const createdOrders = await orderRepository.insertMany(mockOrders);

    const orderIds = createdOrders.map((order) => order._id);

    const mockDeliveries = generateMockDeliveries(
        validDeliveriesQuantity,
        orderIds,
        driverIds
    );

    const createdDeliveries =
        await deliveryRepository.insertMany(mockDeliveries);

    return {
        users: createdUsers.length,
        orders: createdOrders.length,
        deliveries: createdDeliveries.length
    };
}
}

export default new MockService();