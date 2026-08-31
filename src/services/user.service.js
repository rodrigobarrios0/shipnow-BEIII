import userRepository from '../repositories/user.repository.js';
import AppError from '../utils/app-error.js';
import { ERROR_CODES } from '../errors/error-codes.js';
import { unlink } from 'node:fs/promises';
import { relative } from 'node:path';
import { DOCUMENT_TYPES } from '../constants/index.js';
import logger from '../config/logger.js';

class UserService {
    async getAllUsers() {
        return userRepository.getAllUsers();
    }

    async getUserById(userId) {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new AppError(ERROR_CODES.USER_NOT_FOUND);
        }

        return user;
    }

    async createUser(userData) {
        const existingUser = await userRepository.getByEmail(userData.email);

        if (existingUser) {
            throw new AppError(ERROR_CODES.DUPLICATE_EMAIL);
        }

        return userRepository.create(userData);
    }

    async updateUser(userId, userData) {
        const user = await this.getUserById(userId);

            if (userData.email && userData.email !== user.email) {
                const existingUser = await userRepository.getByEmail(userData.email);

            if (existingUser) {
                throw new AppError(ERROR_CODES.DUPLICATE_EMAIL);
            }
        }

        return userRepository.update(userId, userData);
    }

    async deleteUser(userId) {
        const deletedUser = await userRepository.delete(userId);

        if (!deletedUser) {
            throw new AppError(ERROR_CODES.USER_NOT_FOUND);
        }

        return deletedUser;
    }

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

    async addDocument(userId, file, documentType) {
        if (!file) {
            throw new AppError(ERROR_CODES.FILE_REQUIRED);
        }

        const allowedDocumentTypes = [
            DOCUMENT_TYPES.USER_DOCUMENT,
            DOCUMENT_TYPES.DRIVER_LICENSE
        ];

        if (!allowedDocumentTypes.includes(documentType)) {
            await this.removeUploadedFile(file);

            throw new AppError(
                ERROR_CODES.INVALID_DOCUMENT_TYPE
            );
        }

        try {
            await this.getUserById(userId);

            const documentMetadata = {
                originalName: file.originalname,
                filename: file.filename,
                path: relative(
                    process.cwd(),
                    file.path
                ).replaceAll('\\', '/'),
                mimeType: file.mimetype,
                size: file.size,
                documentType
            };

            const updatedUser = await userRepository.addDocument(
                userId,
                documentMetadata
            );

            logger.info('Documento asociado a un usuario.', {
                userId,
                filename: file.filename,
                documentType
            });

            return updatedUser;
        } catch (error) {
            await this.removeUploadedFile(file);
            throw error;
        }
    }
}

export default new UserService();