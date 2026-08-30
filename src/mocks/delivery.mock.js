import { faker } from '@faker-js/faker';
import { DELIVERY_STATUS } from '../constants/index.js';

export const generateMockDeliveries = (
    quantity,
    orderIds,
    driverIds
) => {
    const selectedOrderIds = faker.helpers
        .shuffle([...orderIds])
        .slice(0, quantity);

    return selectedOrderIds.map((orderId) => ({
        order: orderId,
        driver: faker.helpers.arrayElement(driverIds),
        status: DELIVERY_STATUS.PENDING
    }));
};