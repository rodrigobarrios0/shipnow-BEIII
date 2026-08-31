import mongoose from 'mongoose';
import config from '../src/config/index.js';
import User from '../src/models/user.model.js';
import Product from '../src/models/product.model.js';
import Order from '../src/models/order.model.js';
import Delivery from '../src/models/delivery.model.js';

before(async function () {
    this.timeout(15000);

    await mongoose.connect(config.mongoUri);

    const databaseName = mongoose.connection.name;

    if (!databaseName.toLowerCase().includes('test')) {
        await mongoose.disconnect();

        throw new Error(
            `La base "${databaseName}" no parece ser de testing.`
        );
    }
});

beforeEach(async function () {
    await Promise.all([
        Delivery.deleteMany({}),
        Order.deleteMany({}),
        Product.deleteMany({}),
        User.deleteMany({})
    ]);
});

after(async function () {
    await mongoose.disconnect();
});