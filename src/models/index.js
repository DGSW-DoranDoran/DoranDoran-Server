// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config.json')[env];
// const db = {};

// const CategoryInfo = require('./CategoryInfo');
// const CommentInfo = require('./CommentInfo');
// const GroupInfo = require('./GroupInfo');
// const GroupMemberInfo = require('./GroupMemberInfo');
// const MemberInfo = require('./MemberInfo');

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// db.CategoryInfo = CategoryInfo(sequelize, Sequelize);
// db.CommentInfo = CommentInfo(sequelize, Sequelize);
// db.GroupInfo = GroupInfo(sequelize, Sequelize);
// db.GroupMemberInfo = GroupMemberInfo(sequelize, Sequelize);
// db.MemberInfo = MemberInfo(sequelize, Sequelize);

// module.exports = db;




const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, 
  config.password, {
    database: config.database,
    host: config.host,
    dialect: config.dialect,
  });

const models = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('0') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    const extName = path.extname(path.join(__dirname, file));
    const baseName = path.basename(path.join(__dirname, file), extName);

    const model = sequelize.import(path.join(__dirname, file));
    models[baseName] = model;
  });


  Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  sequelize.sync().then(() => {
    console.log('[Model - Index] Schema is synchronized');
  }).catch((error) => {
    console.log('[Model - Index] An error has occurred: ', (error));
  }); 


models.sequelize = sequelize;
models.Sequelize = sequelize;

module.exports = models;