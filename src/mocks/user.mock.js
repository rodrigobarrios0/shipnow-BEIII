import { faker } from '@faker-js/faker';
import { USER_ROLES } from '../constants/index.js';

export const generateMockUser = () => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        role: faker.helpers.arrayElement(Object.values(USER_ROLES))
    };
};

export const generateMockUsers = (quantity = 10) => {
    return Array.from(
        { length: quantity },
        () => generateMockUser()
    );
};