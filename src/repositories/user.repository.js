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

    async addDocument(userId, documentMetadata) {
        return User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    documents: documentMetadata
                }
            },
            {
                new: true,
                runValidators: true
            }
    );
}
}

export default new UserRepository();