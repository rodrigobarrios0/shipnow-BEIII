import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.3',

        info: {
            title: 'ShipNow API',
            version: '1.0.0',
            description:
                'API logística desarrollada durante Backend III. Incluye arquitectura por capas, mocks, errores centralizados, logging y documentación.'
        },

        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Servidor local'
            }
        ],

        tags: [
            {
                name: 'Users',
                description: 'Administración de usuarios'
            },
            {
                name: 'Products',
                description: 'Administración de productos'
            },
            {
                name: 'Orders',
                description: 'Pedidos generados por ShipNow'
            },
            {
                name: 'Deliveries',
                description: 'Entregas asociadas a pedidos'
            },
            {
                name: 'Mocks',
                description: 'Generación de datos de prueba'
            },
            {
                name: 'Logger',
                description: 'Herramientas internas de logging'
            }
        ],

        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '66cf1c14d878fd03778ec301'
                        },
                        name: {
                            type: 'string',
                            example: 'Camila Torres'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'camila@example.com'
                        },
                        role: {
                            type: 'string',
                            enum: ['admin', 'user', 'driver'],
                            example: 'user'
                        }
                    }
                },

                Product: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '66cf1c14d878fd03778ec302'
                        },
                        name: {
                            type: 'string',
                            example: 'Paquete mediano'
                        },
                        description: {
                            type: 'string',
                            example: 'Paquete para envío nacional'
                        },
                        price: {
                            type: 'number',
                            example: 1500
                        },
                        stock: {
                            type: 'integer',
                            example: 20
                        },
                        status: {
                            type: 'string',
                            enum: ['available', 'out_of_stock']
                        }
                    }
                },

                Order: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string'
                        },
                        customer: {
                            type: 'string',
                            description: 'Identificador del usuario'
                        },
                        description: {
                            type: 'string',
                            example: 'Entrega de paquete mediano'
                        },
                        total: {
                            type: 'number',
                            example: 12500
                        },
                        status: {
                            type: 'string',
                            enum: [
                                'pending',
                                'assigned',
                                'delivered',
                                'cancelled'
                            ]
                        },
                        priority: {
                            type: 'string',
                            enum: ['low', 'normal', 'high']
                        }
                    }
                },

                Delivery: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string'
                        },
                        order: {
                            type: 'string',
                            description: 'Identificador del pedido'
                        },
                        driver: {
                            type: 'string',
                            description: 'Identificador del conductor'
                        },
                        status: {
                            type: 'string',
                            enum: [
                                'pending',
                                'in_transit',
                                'delivered'
                            ]
                        },
                        assignedAt: {
                            type: 'string',
                            format: 'date-time'
                        },
                        deliveredAt: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true
                        }
                    }
                },

                ErrorResponse: {
                    type: 'object',
                    required: [
                        'status',
                        'code',
                        'statusCode',
                        'message'
                    ],
                    properties: {
                        status: {
                            type: 'string',
                            example: 'error'
                        },
                        code: {
                            type: 'string',
                            example: 'USER_NOT_FOUND'
                        },
                        statusCode: {
                            type: 'integer',
                            example: 404
                        },
                        message: {
                            type: 'string',
                            example: 'Usuario no encontrado.'
                        }
                    }
                },

                MockGenerationRequest: {
                    type: 'object',
                    required: ['users', 'orders', 'deliveries'],
                    properties: {
                        users: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 100,
                            example: 5
                        },
                        orders: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 100,
                            example: 10
                        },
                        deliveries: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 100,
                            example: 4
                        }
                    }
                },

                MockGenerationResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'success'
                        },
                        message: {
                            type: 'string',
                            example:
                                'Datos de prueba generados correctamente.'
                        },
                        payload: {
                            type: 'object',
                            properties: {
                                users: {
                                    type: 'integer',
                                    example: 5
                                },
                                orders: {
                                    type: 'integer',
                                    example: 10
                                },
                                deliveries: {
                                    type: 'integer',
                                    example: 4
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    apis: ['./src/docs/*.yaml']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;