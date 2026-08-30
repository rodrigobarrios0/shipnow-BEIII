import express from 'express';
import apiRouter from './routes/index.js';
import errorHandler from './middlewares/error-handler.js';
import notFoundHandler from './middlewares/not-found-handler.js';
import requestLogger from './middlewares/request-logger.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true
    })
);

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