import { faker } from '@faker-js/faker';
import {
    ORDER_PRIORITY,
    ORDER_STATUS
} from '../constants/index.js';

export const generateMockOrder = (
    customerId = faker.database.mongodbObjectId()
) => {
    return {
        customer: customerId,
        description: faker.commerce.productDescription(),
        total: Number(faker.commerce.price({
            min: 1000,
            max: 50000,
            dec: 2
        })),
        status: ORDER_STATUS.PENDING,
        priority: faker.helpers.arrayElement(
            Object.values(ORDER_PRIORITY)
        )
    };
};

export const generateMockOrders = (
    quantity = 10,
    customerIds = []
) => {
    return Array.from({ length: quantity }, () => {
        const customerId = customerIds.length > 0
            ? faker.helpers.arrayElement(customerIds)
            : faker.database.mongodbObjectId();

        return generateMockOrder(customerId);
    });
};