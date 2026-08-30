import express from 'express';
import apiRouter from './routes/index.js';
import errorHandler from './middlewares/error-handler.js';
import notFoundHandler from './middlewares/not-found-handler.js';

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'ShipNow API funcionando'
    });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;