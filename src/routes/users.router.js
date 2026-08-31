import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { userDocumentUpload } from '../config/upload.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post(
    '/:id/documents',
    userDocumentUpload.single('document'),
    userController.uploadDocument
);

export default router;