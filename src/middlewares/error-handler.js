import { ERROR_CODES } from '../errors/error-codes.js';
import logger from '../config/logger.js';

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

    const isExpectedError =
    error.isOperational ||
    error.name === 'CastError' ||
    error.name === 'ValidationError' ||
    error.code === 11000;

const logMetadata = {
    code: selectedError.code,
    method: req.method,
    path: req.originalUrl,
    statusCode: selectedError.statusCode,
    originalMessage: error.message
};

if (isExpectedError) {
    logger.warning('Error controlado en la API.', logMetadata);
} else {
    logger.error('Error inesperado en la API.', {
        ...logMetadata,
        stack: error.stack
    });
}

    res.status(selectedError.statusCode).json({
        status: 'error',
        code: selectedError.code,
        statusCode: selectedError.statusCode,
        message: selectedError.message
    });
};

export default errorHandler;