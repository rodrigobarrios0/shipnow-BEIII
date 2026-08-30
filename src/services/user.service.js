import userRepository from '../repositories/user.repository.js';
import AppError from '../utils/app-error.js';
import { ERROR_CODES } from '../errors/error-codes.js';

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
        throw new AppError('Usuario no encontrado.', 404);
        }

        return deletedUser;
    }
}

export default new UserService();