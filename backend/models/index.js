const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize(
  sequelizeConfig.database, 
  sequelizeConfig.username, 
  sequelizeConfig.password, 
  {
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect,
    logging: false
  }
);

const db = {
  sequelize,
  Sequelize,
  User: require('./user')(sequelize, Sequelize),
  Attendance: require('./attendance')(sequelize, Sequelize),
  Permission: require('./permission')(sequelize, Sequelize),
  TeacherJournal: require('./teacherjournal')(sequelize, Sequelize)
};

// Create associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
