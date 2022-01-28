const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.Port,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: false
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



//User Model
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.app = require("./smsapp.model.js")(sequelize, Sequelize);
db.mobile = require("./mobile.model.js")(sequelize, Sequelize);



db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.app.belongsToMany(db.mobile, {
  through: "app_mobiles",
  foreignKey: "appId",
  otherKey: "mobileId"
});

db.mobile.belongsToMany(db.app, {
  through: "app_mobiles",
  foreignKey: "mobileId",
  otherKey: "appId"
});









db.ROLES = ["super"];  

module.exports = db;