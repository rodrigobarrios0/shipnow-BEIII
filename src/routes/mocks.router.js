import { Router } from 'express';
import mockController from '../controllers/mock.controller.js';

const router = Router();

router.get('/mockingusers', mockController.getMockUsers);
router.get('/mockingorders', mockController.getMockOrders);
router.post('/generateData', mockController.generateData);
export default router;