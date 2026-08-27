import userService from '../services/user.service.js';

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();

            res.status(200).json({
                status: 'success',
                payload: users
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);

            res.status(200).json({
                status: 'success',
                payload: user
            });
        } catch (error) {
            next(error);
        }
    }

    async createUser(req, res, next) {
        try {
            const newUser = await userService.createUser(req.body);

            res.status(201).json({
                status: 'success',
                payload: newUser
            });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const updatedUser = await userService.updateUser(
                req.params.id,
                req.body
            );

            res.status(200).json({
                status: 'success',
                payload: updatedUser
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const deletedUser = await userService.deleteUser(req.params.id);

            res.status(200).json({
                status: 'success',
                payload: deletedUser
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();