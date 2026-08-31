import { Router } from 'express';
import deliveryController from '../controllers/delivery.controller.js';
import { deliveryProofUpload } from '../config/upload.js';

const router = Router();

router.post(
    '/:id/proof',
    deliveryProofUpload.single('proof'),
    deliveryController.uploadProof
);

export default router;