import logger from '../config/logger.js';

class LoggerController {
    testLogger(req, res) {
        logger.debug('Log de prueba: debug');
        logger.http('Log de prueba: http');
        logger.info('Log de prueba: info');
        logger.warning('Log de prueba: warning');
        logger.error('Log de prueba: error');
        logger.fatal('Log de prueba: fatal');

        res.status(200).json({
            status: 'success',
            message: 'Todos los niveles del logger fueron ejecutados.'
        });
    }
}

export default new LoggerController();