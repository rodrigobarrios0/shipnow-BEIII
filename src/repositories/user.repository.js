import User from '../models/user.model.js';

class UserRepository {
    async getAllUsers() {
        return User.find({}, { __v: 0 }).sort({ createdAt: -1 });
    }

    async getByEmail(email) {
        return User.findOne({ email });
    }

    async create(userData) {
        return User.create(userData);
    }

    async getById(userId) {
        return User.findById(userId, { __v: 0 });
    }

    async update(userId, userData) {
        return User.findByIdAndUpdate(userId, userData, {
        new: true,
        runValidators: true
    });
    }

    async delete(userId) {
        return User.findByIdAndDelete(userId);
    }

    async insertMany(usersData) {
        return User.insertMany(usersData);
    }
}

export default new UserRepository();