import logger from '../config/logger.js';

const requestLogger = (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        logger.http('Petición HTTP completada.', {
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: Date.now() - startTime
        });
    });

    next();
};

export default requestLogger;