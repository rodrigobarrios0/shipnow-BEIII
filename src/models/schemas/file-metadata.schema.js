import mongoose from 'mongoose';
import { DOCUMENT_TYPES } from '../../constants/index.js';

const fileMetadataSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        mimeType: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true,
            min: 0
        },
        documentType: {
            type: String,
            enum: Object.values(DOCUMENT_TYPES),
            required: true
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: true
    }
);

export default fileMetadataSchema;