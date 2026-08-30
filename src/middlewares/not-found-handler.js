import AppError from '../utils/app-error.js';
import { ERROR_CODES } from '../errors/error-codes.js';

const notFoundHandler = (req, res, next) => {
    next(new AppError(ERROR_CODES.ROUTE_NOT_FOUND));
};

export default notFoundHandler;