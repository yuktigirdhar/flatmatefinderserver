'use strict';

require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/roommate-finder-database',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL || 'mongodb://roommate-finder-test-database',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d', 
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME, 
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET:  process.env.CLOUDINARY_API_SECRET
}; 