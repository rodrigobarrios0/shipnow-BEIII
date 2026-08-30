import Delivery from '../models/delivery.model.js';

class DeliveryRepository {
    async insertMany(deliveriesData) {
        return Delivery.insertMany(deliveriesData);
    }
}

export default new DeliveryRepository();