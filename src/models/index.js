'use strict';

const colors = require('colors');
const fs = require('fs');
const path = require('path');
const config = require('../config/config.json').development;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging,
    define: {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    }
});
const db = {};

sequelize
    .authenticate()
    .then(() => {
        console.log(colors.green('Connection has been established successfully'));
    })
    .catch(err => {
        console.log(colors.red('Unable to connect to the database: ', err));
    });

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== undefined) && (typeof file !== undefined) && (file !== null);
    })
    .forEach((file) => {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    };
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;