'use strict';

const DotENV = require('dotenv');
const DBConfig = require('./db-config.json');

DotENV.config();
const env = process.env.NODE_ENV;

module.exports = {
    env: env,
    port: process.env.PORT,
    dbConfig: DBConfig[process.env.NODE_ENV]
};