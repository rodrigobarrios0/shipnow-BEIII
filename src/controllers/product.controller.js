import productService from '../services/product.service.js';

class ProductController {
    async findAvailableProducts(req, res, next) {
        try {
            const products = await productService.findAvailableProducts();

            res.status(200).json({
                status: 'success',
                payload: products
            });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const product = await productService.getProductById(req.params.id);

            res.status(200).json({
                status: 'success',
                payload: product
            });
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req, res, next) {
        try {
            const newProduct = await productService.createProduct(req.body);

            res.status(201).json({
                status: 'success',
                payload: newProduct
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const updatedProduct = await productService.updateProduct(
                req.params.id,
                req.body
            );

            res.status(200).json({
                status: 'success',
                payload: updatedProduct
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const deletedProduct = await productService.deleteProduct(req.params.id);

            res.status(200).json({
                status: 'success',
                payload: deletedProduct
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();