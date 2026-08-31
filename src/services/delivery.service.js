import { unlink } from 'node:fs/promises';
import { relative } from 'node:path';
import deliveryRepository from '../repositories/delivery.repository.js';
import AppError from '../utils/app-error.js';
import { ERROR_CODES } from '../errors/error-codes.js';
import { DOCUMENT_TYPES } from '../constants/index.js';
import logger from '../config/logger.js';

class DeliveryService {
    async removeUploadedFile(file) {
        if (!file?.path) {
            return;
        }

        try {
            await unlink(file.path);
        } catch (error) {
            logger.error('No se pudo eliminar un archivo huérfano.', {
                path: file.path,
                error: error.message
            });
        }
    }

    async addProof(deliveryId, file) {
        if (!file) {
            throw new AppError(ERROR_CODES.FILE_REQUIRED);
        }

        try {
            const delivery = await deliveryRepository.getById(
                deliveryId
            );

            if (!delivery) {
                throw new AppError(
                    ERROR_CODES.DELIVERY_NOT_FOUND
                );
            }

            const proofMetadata = {
                originalName: file.originalname,
                filename: file.filename,
                path: relative(
                    process.cwd(),
                    file.path
                ).replaceAll('\\', '/'),
                mimeType: file.mimetype,
                size: file.size,
                documentType: DOCUMENT_TYPES.DELIVERY_PROOF
            };

            const updatedDelivery =
                await deliveryRepository.addProof(
                    deliveryId,
                    proofMetadata
                );

            logger.info('Comprobante asociado a una entrega.', {
                deliveryId,
                filename: file.filename
            });

            return updatedDelivery;
        } catch (error) {
            await this.removeUploadedFile(file);
            throw error;
        }
    }
}

export default new DeliveryService();