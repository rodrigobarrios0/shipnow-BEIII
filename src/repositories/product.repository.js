import Product from '../models/product.model.js';
import { PRODUCT_STATUS } from '../constants/index.js';

class ProductRepository {
    async getAvailableProducts() {
        return Product.find(
        { status: PRODUCT_STATUS.AVAILABLE },
        { __v: 0 }
        ).sort({ createdAt: -1 });
    }

    async getById(productId) {
        return Product.findById(productId, { __v: 0 });
    }

    async create(productData) {
        return Product.create(productData);
    }

    async update(productId, productData) {
        return Product.findByIdAndUpdate(productId, productData, {
            new: true,
            runValidators: true
        });
    }

    async delete(productId) {
        return Product.findByIdAndDelete(productId);
    }
}

export default new ProductRepository();