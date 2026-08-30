import { ERROR_CODES } from '../errors/error-codes.js';

const errorHandler = (error, req, res, next) => {
    let selectedError;

    if (error.name === 'CastError') {
        selectedError = ERROR_CODES.INVALID_ID;
    } else if (error.name === 'ValidationError') {
        selectedError = ERROR_CODES.VALIDATION_ERROR;
    } else if (error.code === 11000) {
        selectedError = ERROR_CODES.DUPLICATE_RESOURCE;
    } else if (error.isOperational) {
        selectedError = error;
    } else {
        selectedError = ERROR_CODES.INTERNAL_SERVER_ERROR;
    }

    console.error({
        code: selectedError.code,
        message: error.message,
        method: req.method,
        path: req.originalUrl
    });

    res.status(selectedError.statusCode).json({
        status: 'error',
        code: selectedError.code,
        statusCode: selectedError.statusCode,
        message: selectedError.message
    });
};

export default errorHandler;