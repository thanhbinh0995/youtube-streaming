'use strict';

const FS = require('fs-extra');
const Path = require('path');
const Sequelize = require('sequelize');
const {dbConfig} = require('../config/index');

const basename = Path.basename(module.filename);

const db = {};
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
FS
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) &&
            (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = sequelize['import'](Path.join(__dirname, file));
        db[model.name] = model;
    });

Object
    .keys(db)
    .forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
db.sequelize = sequelize;
db.Op = Sequelize.Op;

module.exports = db;
