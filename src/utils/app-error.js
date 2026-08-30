class AppError extends Error {
    constructor(errorDefinition, details = null) {
        super(errorDefinition.message);

        this.name = 'AppError';
        this.code = errorDefinition.code;
        this.statusCode = errorDefinition.statusCode;
        this.details = details;
        this.isOperational = true;

        Error.captureStackTrace?.(this, this.constructor);
    }
}

export default AppError;