require('dotenv').config();
let config = {};

config.DB_PORT = process.env.DB_PORT

config.ENVIRONMENT = process.env.ENVIRONMENT;

config.SERVER_PORT = process.env.SERVER_PORT;

config.JWT_SIGNING_KEY = process.env.JWT_SIGNING_KEY;

config.SALT_ROUNDS = process.env.SALT_ROUNDS ? process.env.SALT_ROUNDS : 8;

config.SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY;

config.IS_PRODUCTION_ENVIRONMENT = () => config.ENVIRONMENT === 'PRODUCTION';

module.exports = config;