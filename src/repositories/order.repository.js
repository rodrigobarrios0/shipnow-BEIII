import Order from '../models/order.model.js';

class OrderRepository {
    async insertMany(ordersData) {
        return Order.insertMany(ordersData);
    }
}

export default new OrderRepository();