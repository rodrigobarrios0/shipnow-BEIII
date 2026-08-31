export const ERROR_CODES = Object.freeze({
    USER_NOT_FOUND: Object.freeze({
        code: 'USER_NOT_FOUND',
        statusCode: 404,
        message: 'Usuario no encontrado.'
    }),

    PRODUCT_NOT_FOUND: Object.freeze({
        code: 'PRODUCT_NOT_FOUND',
        statusCode: 404,
        message: 'Producto no encontrado.'
    }),

    DUPLICATE_EMAIL: Object.freeze({
        code: 'DUPLICATE_EMAIL',
        statusCode: 409,
        message: 'Ya existe un usuario con ese email.'
    }),

    INVALID_MOCK_QUANTITY: Object.freeze({
        code: 'INVALID_MOCK_QUANTITY',
        statusCode: 400,
        message: 'La cantidad debe ser un número entero entre 1 y 100.'
    }),

    DELIVERIES_EXCEED_ORDERS: Object.freeze({
        code: 'DELIVERIES_EXCEED_ORDERS',
        statusCode: 400,
        message: 'No puede haber más entregas que pedidos.'
    }),

    INVALID_ID: Object.freeze({
        code: 'INVALID_ID',
        statusCode: 400,
        message: 'El identificador proporcionado no es válido.'
    }),

    ROUTE_NOT_FOUND: Object.freeze({
        code: 'ROUTE_NOT_FOUND',
        statusCode: 404,
        message: 'Ruta no encontrada.'
    }),

    INTERNAL_SERVER_ERROR: Object.freeze({
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        message: 'Error interno del servidor.'
    }),

    VALIDATION_ERROR: Object.freeze({
    code: 'VALIDATION_ERROR',
    statusCode: 400,
    message: 'Los datos proporcionados no son válidos.'
    }), 

    DUPLICATE_RESOURCE: Object.freeze({
        code: 'DUPLICATE_RESOURCE',
        statusCode: 409,
        message: 'El recurso ya existe.'
    }),

    FILE_REQUIRED: Object.freeze({
    code: 'FILE_REQUIRED',
    statusCode: 400,
    message: 'Debe enviar un archivo.'
    }),

    INVALID_FILE_TYPE: Object.freeze({
        code: 'INVALID_FILE_TYPE',
        statusCode: 400,
        message: 'El tipo de archivo no está permitido.'
    }),

    FILE_TOO_LARGE: Object.freeze({
        code: 'FILE_TOO_LARGE',
        statusCode: 400,
        message: 'El archivo supera el tamaño máximo permitido de 5 MB.'
    }),

    INVALID_DOCUMENT_TYPE: Object.freeze({
        code: 'INVALID_DOCUMENT_TYPE',
        statusCode: 400,
        message: 'El tipo de documento no es válido.'
    }),

    UPLOAD_ERROR: Object.freeze({
        code: 'UPLOAD_ERROR',
        statusCode: 500,
        message: 'Ocurrió un error al guardar el archivo.'
    }),

    INVALID_FILE_FIELD: Object.freeze({
        code: 'INVALID_FILE_FIELD',
        statusCode: 400,
        message: 'El nombre del campo de archivo no es válido.'
    }),

    DELIVERY_NOT_FOUND: Object.freeze({
    code: 'DELIVERY_NOT_FOUND',
    statusCode: 404,
    message: 'Entrega no encontrada.'
}),
});
