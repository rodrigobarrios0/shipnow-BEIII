import productRepository from '../repositories/product.repository.js';
import { PRODUCT_STATUS } from '../constants/index.js';
import AppError from '../utils/app-error.js';
import { ERROR_CODES } from '../errors/error-codes.js';

class ProductService {

    async findAvailableProducts() {
        return productRepository.getAvailableProducts();
    }

    async getProductById(productId) {
        const product = await productRepository.getById(productId);

        if (!product) {
            throw new AppError(ERROR_CODES.PRODUCT_NOT_FOUND);
        }

        return product;
    }

    async createProduct(productData) {
        const status =
            Number(productData.stock) > 0
            ? PRODUCT_STATUS.AVAILABLE
            : PRODUCT_STATUS.OUT_OF_STOCK;

        return productRepository.create({
            ...productData,
            status
        });
    }

    async updateProduct(productId, productData) {
        if (productData.stock !== undefined) {
            productData.status =
            Number(productData.stock) > 0
            ? PRODUCT_STATUS.AVAILABLE
            : PRODUCT_STATUS.OUT_OF_STOCK;
        }

        const updatedProduct = await productRepository.update(
            productId,
            productData
        );

        if (!updatedProduct) {
            throw new AppError(ERROR_CODES.PRODUCT_NOT_FOUND);
        }

        return updatedProduct;
    }

    async deleteProduct(productId) {
        const deletedProduct = await productRepository.delete(productId);

        if (!deletedProduct) {
            throw new AppError(ERROR_CODES.PRODUCT_NOT_FOUND);
        }

        return deletedProduct;
        }
}

export default new ProductService();