import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from './index.js';

const logLevels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
};

const logColors = {
    fatal: 'magenta',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'blue'
};

winston.addColors(logColors);

const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(({ timestamp, level, message, ...metadata }) => {
        const extraData = Object.keys(metadata).length > 0
            ? ` ${JSON.stringify(metadata)}`
            : '';

        return `${timestamp} [${level}]: ${message}${extraData}`;
    })
);

const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

const logger = winston.createLogger({
    levels: logLevels,
    level: config.environment === 'production'
        ? 'info'
        : 'debug',
    format: fileFormat,
    transports: [
        new winston.transports.Console({
            format: consoleFormat
        }),

        new DailyRotateFile({
            level: 'error',
            dirname: 'logs',
            filename: 'errors-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '10m',
            maxFiles: '14d'
        })
    ],
    exitOnError: false
});

export default logger;