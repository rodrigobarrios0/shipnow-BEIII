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
});