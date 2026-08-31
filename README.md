# ShipNow API

API backend para una plataforma logística, desarrollada como pre-entrega del Módulo 1 de Backend III.

## Objetivo

Refactorizar la aplicación con una arquitectura por capas y una configuración de entorno centralizada, para mejorar la mantenibilidad, la seguridad y la preparación para testing.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- Nodemon

## Arquitectura

```text
Request HTTP
  ↓
Router
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Model
  ↓
MongoDB Atlas
```

- **Router:** define las rutas disponibles y conecta cada endpoint con un controller.
- **Controller:** recibe datos HTTP (`req`), llama al service y construye la respuesta HTTP (`res`).
- **Service:** contiene reglas de negocio, como evitar emails duplicados y definir el estado de un producto según su stock.
- **Repository:** concentra las consultas y escrituras en MongoDB mediante Mongoose.
- **Model:** define la estructura y las validaciones básicas de los documentos.

## Instalación

1. Clonar el repositorio.
2. Instalar las dependencias:

```bash
npm install
```

3. Crear el archivo de variables de entorno a partir de `.env.example`.

En Windows:

```powershell
Copy-Item .env.example .env
```

4. Completar las variables del archivo `.env`:

```env
PORT=8080
MONGODB_URI=tu_uri_de_mongodb_atlas
NODE_ENV=development
```

5. Iniciar el servidor:

```bash
npm run dev
```

## Endpoints

### Health check

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/health` | Verifica que la API esté funcionando |

### Products

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/products` | Lista productos disponibles |
| GET | `/api/products/:id` | Obtiene un producto por ID |
| POST | `/api/products` | Crea un producto |
| PUT | `/api/products/:id` | Actualiza un producto |
| DELETE | `/api/products/:id` | Elimina un producto |

### Users

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/users` | Lista usuarios |
| GET | `/api/users/:id` | Obtiene un usuario por ID |
| POST | `/api/users` | Crea un usuario |
| PUT | `/api/users/:id` | Actualiza un usuario |
| DELETE | `/api/users/:id` | Elimina un usuario |

## Variables de entorno

La aplicación valida al iniciar que existan `PORT`, `MONGODB_URI` y `NODE_ENV`. Si falta alguna, el servidor no inicia y muestra un mensaje descriptivo.

El archivo `.env` no se sube al repositorio. En su lugar, `.env.example` documenta las variables necesarias sin exponer credenciales.

## Decisiones de arquitectura

La separación entre Service y Repository permite que cada capa tenga una única responsabilidad:

- El **Repository** conoce Mongoose y MongoDB.
- El **Service** conoce las reglas del negocio.

Por ejemplo, al crear o actualizar un producto, el service define si su estado es `available` u `out_of_stock` según el stock. El repository solamente guarda el resultado en MongoDB.

Esta separación evita controllers con lógica de negocio o consultas directas a la base de datos y facilita el mantenimiento, el testing y futuras modificaciones.

## Mocking y datos de prueba

La API incluye herramientas para generar datos ficticios con Faker. Estos endpoints permiten probar el sistema sin utilizar información real.

### Endpoints de mocking

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/mocks/mockingusers` | Genera usuarios ficticios en memoria |
| GET | `/api/mocks/mockingorders` | Genera pedidos ficticios en memoria |
| POST | `/api/mocks/generateData` | Genera y guarda usuarios, pedidos y entregas en MongoDB |

Los endpoints GET aceptan el parámetro opcional `quantity`:

```text
GET /api/mocks/mockingusers?quantity=10
GET /api/mocks/mockingorders?quantity=10
```

La cantidad debe ser un número entero entre 1 y 100.

Para insertar datos relacionados en MongoDB:

```http
POST /api/mocks/generateData
Content-Type: application/json
```

```json
{
  "users": 5,
  "orders": 10,
  "deliveries": 4
}
```

Los datos se generan respetando sus relaciones:

```text
Usuario → Pedido → Entrega
```

Primero se crean los usuarios para obtener sus identificadores. Después se crean los pedidos asociados a esos usuarios y, finalmente, las entregas asociadas a pedidos y conductores existentes.

No puede solicitarse una cantidad de entregas superior a la cantidad de pedidos.

## Manejo profesional de errores

La API utiliza una capa centralizada para gestionar errores y devolver respuestas HTTP consistentes.

El flujo de un error es:

```text
Service detecta el problema
        ↓
Lanza un AppError
        ↓
Controller ejecuta next(error)
        ↓
Middleware global construye la respuesta

```

Todos los errores utilizan una estructura uniforme:

```json
{
  "status": "error",
  "code": "USER_NOT_FOUND",
  "statusCode": 404,
  "message": "Usuario no encontrado."
}
```

### Errores controlados

| Código | HTTP | Descripción |
| --- | ---: | --- |
| `USER_NOT_FOUND` | 404 | El usuario no existe |
| `PRODUCT_NOT_FOUND` | 404 | El producto no existe |
| `DUPLICATE_EMAIL` | 409 | El email ya está registrado |
| `INVALID_MOCK_QUANTITY` | 400 | La cantidad de mocks es inválida |
| `DELIVERIES_EXCEED_ORDERS` | 400 | Hay más entregas que pedidos |
| `INVALID_ID` | 400 | El identificador de MongoDB no es válido |
| `VALIDATION_ERROR` | 400 | Los datos no cumplen las validaciones |
| `DUPLICATE_RESOURCE` | 409 | Se intentó crear un recurso repetido |
| `ROUTE_NOT_FOUND` | 404 | La ruta solicitada no existe |
| `INTERNAL_SERVER_ERROR` | 500 | Ocurrió un error inesperado |

El middleware también transforma errores producidos por Mongoose, como identificadores inválidos, validaciones fallidas y valores únicos duplicados.

### Pruebas rápidas de errores

```text
GET /api/no-existe
GET /api/users/abc
GET /api/mocks/mockingusers?quantity=-5
```

Para comprobar la relación entre pedidos y entregas:

```http
POST /api/mocks/generateData
Content-Type: application/json
```

```json
{
  "users": 5,
  "orders": 2,
  "deliveries": 4
}
```

La última petición responde con `400` porque no puede haber más entregas que pedidos.

## Logging y monitoreo

ShipNow utiliza Winston para registrar eventos importantes de la aplicación.

### Niveles disponibles

| Nivel | Uso |
| --- | --- |
| `debug` | Información detallada para desarrollo |
| `http` | Registro de peticiones HTTP |
| `info` | Eventos normales importantes |
| `warning` | Errores esperados o situaciones sospechosas |
| `error` | Errores inesperados |
| `fatal` | Fallas críticas que impiden continuar |

En desarrollo se muestran todos los niveles. En producción se registran únicamente los niveles desde `info` hasta `fatal`.

### Endpoint de prueba

```text
GET /api/logger/test
```

El endpoint genera un mensaje de cada nivel para verificar la configuración.

Los niveles `error` y `fatal` se guardan en:

```text
logs/errors-YYYY-MM-DD.log
```

Los archivos rotan diariamente, tienen un tamaño máximo de 10 MB y se conservan durante 14 días.

La carpeta `logs/` y los archivos `*.log` están excluidos del repositorio mediante `.gitignore`.

Cada petición HTTP registra:

- Método.
- Ruta.
- Código de respuesta.
- Duración en milisegundos.

El middleware global registra los errores esperados como `warning` y los errores inesperados como `error`.

## Documentación con Swagger

La API cuenta con documentación interactiva generada mediante Swagger y OpenAPI 3.0.

Con el servidor iniciado, puede consultarse en:

```text
http://localhost:8080/api/docs
```

La documentación está organizada por módulos:

- Users.
- Products.
- Mocks.
- Logger.

También contiene schemas reutilizables para:

- Usuarios.
- Productos.
- Pedidos.
- Entregas.
- Respuestas de error.
- Generación de datos de prueba.

Swagger UI permite consultar los parámetros, bodies, respuestas y errores posibles, además de ejecutar peticiones mediante la opción **Try it out**.

Los modelos `Order` y `Delivery` están documentados como schemas porque forman parte de la generación de datos mock. Actualmente no cuentan con endpoints CRUD públicos.

Los valores inválidos que incumplen restricciones documentadas, como una cantidad menor que `1`, pueden ser rechazados directamente por Swagger UI antes de enviar la petición.

## Testing funcional

ShipNow incluye una suite de tests funcionales desarrollada con:

- **Mocha:** organiza y ejecuta los tests.
- **Chai:** permite validar resultados mediante aserciones.
- **Supertest:** realiza peticiones HTTP directamente contra la aplicación Express.

### Entorno de testing

Los tests utilizan un entorno separado del desarrollo mediante el archivo `.env.test`.

La URI debe apuntar exclusivamente a una base descartable cuyo nombre contenga la palabra `test`, por ejemplo:

```env
PORT=8081
MONGODB_URI=mongodb://localhost:27017/shipnow_test
NODE_ENV=test
JWT_SECRET=test_secret
LOG_LEVEL=error
```

El repositorio incluye `.env.test.example` como referencia. El archivo `.env.test` está excluido de Git porque puede contener credenciales.

La suite incorpora una protección que cancela la ejecución si la base conectada no contiene la palabra `test`.

### Ejecución

Para ejecutar todos los tests:

```bash
npm test
```

No es necesario iniciar el servidor manualmente. Supertest importa la aplicación Express directamente y realiza las peticiones internamente.

### Módulos cubiertos

La suite valida:

- Estado general de la API.
- Creación y consulta de usuarios.
- Validaciones de usuarios.
- Emails duplicados.
- Creación y actualización de productos.
- Reglas de stock y estado de productos.
- Generación de datos mock.
- Persistencia de usuarios, pedidos y entregas relacionadas.
- Cantidades inválidas.
- Endpoint de prueba del logger.
- Acceso a Swagger UI.
- Rutas inexistentes.
- Formato uniforme de errores.

### Limpieza de datos

Antes de cada test se eliminan los documentos generados en la base de testing.

Esto permite que los tests sean:

- Independientes.
- Repetibles.
- Predecibles.
- Seguros para los datos de desarrollo.

La suite actual contiene `21` tests funcionales.