import Delivery from '../models/delivery.model.js';

class DeliveryRepository {
    async insertMany(deliveriesData) {
        return Delivery.insertMany(deliveriesData);
    }

    async getById(deliveryId) {
    return Delivery.findById(deliveryId, {
        __v: 0
    });
}

    async addProof(deliveryId, proofMetadata) {
        return Delivery.findByIdAndUpdate(
            deliveryId,
            {
                $set: {
                    proof: proofMetadata
                }
            },
            {
                new: true,
                runValidators: true
            }
        );
    }
}

export default new DeliveryRepository();