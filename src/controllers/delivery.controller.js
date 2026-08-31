import deliveryService from '../services/delivery.service.js';

class DeliveryController {
    async uploadProof(req, res, next) {
        try {
            const updatedDelivery =
                await deliveryService.addProof(
                    req.params.id,
                    req.file
                );

            res.status(201).json({
                status: 'success',
                message:
                    'Comprobante cargado correctamente.',
                payload: updatedDelivery
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new DeliveryController();