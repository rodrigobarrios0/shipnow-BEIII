import 'dotenv/config';

const requiredVariables = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
    throw new Error(
    `Faltan variables de entorno requeridas: ${missingVariables.join(', ')}`
    );
}

const port = Number(process.env.PORT);

if (!Number.isInteger(port) || port <= 0) {
    throw new Error('PORT debe ser un número entero positivo.');
}

const config = Object.freeze({
    port,
    mongoUri: process.env.MONGODB_URI,
    environment: process.env.NODE_ENV
});

export default config;