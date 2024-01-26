const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    },
    db: {
        dbName: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
    }
};
