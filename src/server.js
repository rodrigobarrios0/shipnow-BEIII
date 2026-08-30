import app from './app.js';
import config from './config/index.js';
import connectDatabase from './config/db.js';
import logger from './config/logger.js';

const startServer = async () => {
    await connectDatabase();

app.listen(config.port, () => {
    logger.info('Servidor iniciado correctamente.', {
        port: config.port,
        environment: config.environment
        });
    });
};

startServer();