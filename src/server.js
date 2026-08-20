import app from './app.js';
import config from './config/index.js';
import connectDatabase from './config/db.js';

const startServer = async () => {
    await connectDatabase();

app.listen(config.port, () => {
    console.log(
        `Servidor corriendo en http://localhost:${config.port} (${config.environment})`
    );
    });
};

startServer();