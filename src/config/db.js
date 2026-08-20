import mongoose from 'mongoose';
import config from './index.js';

const connectDatabase = async () => {  
    try {
        const connection = await mongoose.connect(config.mongoUri);

        console.log(`MongoDB conectado: ${connection.connection.host}`);
    } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    process.exit(1);
    }
};

export default connectDatabase;