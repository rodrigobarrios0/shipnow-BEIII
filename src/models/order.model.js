import mongoose from 'mongoose';
import {
    ORDER_PRIORITY,
    ORDER_STATUS
} from '../constants/index.js';

const orderSchema = new mongoose.Schema(
    {
        customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
        description: {
        type: String,
        required: true,
        trim: true
    },
        total: {
        type: Number,
        required: true,
        min: 0
    },
        status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.PENDING
    },
        priority: {
        type: String,
        enum: Object.values(ORDER_PRIORITY),
        default: ORDER_PRIORITY.NORMAL
    }
    },
    {
    timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;