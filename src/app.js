import express from 'express';
import apiRouter from './routes/index.js';

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'ShipNow API funcionando'
    });
});

app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Ruta no encontrada.'
    });
});

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        status: 'error',
        message: error.message || 'Error interno del servidor.'
    });
});

export default app;