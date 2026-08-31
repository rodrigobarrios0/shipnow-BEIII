import mongoose from 'mongoose';
import { USER_ROLES } from '../constants/index.js';
import fileMetadataSchema from './schemas/file-metadata.schema.js';

const userSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        trim: true
        },
        email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
        },
        role: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.USER
        },
        documents: {
        type: [fileMetadataSchema],
        default: []
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;