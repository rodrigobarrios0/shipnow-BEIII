import multer from 'multer';
import { mkdirSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { randomBytes } from 'node:crypto';
import AppError from '../utils/app-error.js';
import { ERROR_CODES } from '../errors/error-codes.js';

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedMimeTypes = new Set([
    'application/pdf',
    'image/jpeg',
    'image/png'
]);

const createStorage = (folder) => {
    const destination = resolve('uploads', folder);

    mkdirSync(destination, {
        recursive: true
    });

    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destination);
        },

        filename: (req, file, callback) => {
            const extension = extname(file.originalname).toLowerCase();
            const uniqueName = randomBytes(16).toString('hex');

            callback(
                null,
                `${file.fieldname}-${uniqueName}${extension}`
            );
        }
    });
};

const fileFilter = (req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
        return callback(
            new AppError(ERROR_CODES.INVALID_FILE_TYPE)
        );
    }

    callback(null, true);
};

const createUploader = (folder) => {
    return multer({
        storage: createStorage(folder),
        fileFilter,
        limits: {
            fileSize: MAX_FILE_SIZE,
            files: 1
        }
    });
};

export const userDocumentUpload = createUploader(
    'user-documents'
);

export const deliveryProofUpload = createUploader(
    'delivery-proofs'
);