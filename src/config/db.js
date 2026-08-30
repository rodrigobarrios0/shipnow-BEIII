import mongoose from 'mongoose';
import config from './index.js';
import logger from './logger.js';

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(config.mongoUri);

        logger.info('MongoDB conectado correctamente.', {
            host: connection.connection.host
        });
    } catch (error) {
        logger.fatal('No se pudo conectar con MongoDB.', {
            error: error.message,
            stack: error.stack
        });

        process.exit(1);
    }
};

export default connectDatabase;