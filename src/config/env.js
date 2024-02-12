// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

module.exports = {
  APP_PORT: process.env.APP_PORT || '8080',
  NODE_ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,

};
