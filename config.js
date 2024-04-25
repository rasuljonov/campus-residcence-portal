const dotenv = require('dotenv')

dotenv.config({
    path: '.env',
    sample: '.env.example',
    allowEmptyValues: false,
});

module.exports = {
    APP: {
        PORT: process.env.APP_PORT,
        SECRET_KEY: process.env.APP_SECRET_KEY,
        EXPIRE_TIME: process.env.APP_EXPIRE_TIME

    },
    DB: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    },
    ENVIRONMENT: process.env.NODE_ENV,
    USE_SECURE_COOKIES: process.env.USE_SECURE_COOKIES === 'true'
}