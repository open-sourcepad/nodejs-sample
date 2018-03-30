require('dotenv').config();

// Global
CONFIG = {}

CONFIG.app = process.env.APP   || 'dev';
CONFIG.port = process.env.PORT  || '3000';

CONFIG.db = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

CONFIG.jwt = {
  encryption: process.env.JWT_ENCRYPTION,
  jwt_expiration: process.env.JWT_EXPIRATION || '10000'
};

module.exports = CONFIG.db;
