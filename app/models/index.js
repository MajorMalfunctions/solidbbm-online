const dbConfig = require("../config/db.config.js");
console.log(dbConfig)
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

//Barangay Models
db.regions = require("./barangayModels/region.model.js")(sequelize, Sequelize);
db.provinces = require("./barangayModels/province.model.js")(sequelize, Sequelize);
db.cityMuns = require("./barangayModels/cityMun.model.js")(sequelize, Sequelize);
db.barangays = require("./barangayModels/barangay.model.js")(sequelize, Sequelize);



//User Model
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.location = require("./location.model.js")(sequelize, Sequelize);
db.supporter = require("./supporter.model.js")(sequelize, Sequelize);



// db.comments = require("./comment.model.js")(sequelize, Sequelize);

//Regions to Province
// db.regions.hasMany(db.provinces, {  
  // foreignKey: "regCode",
  // sourcekey: 'regCode', 
//   as: "provinces" });
// db.provinces.belongsTo(db.regions, {
//   foreignKey: "regCode",
//   sourcekey: 'regCode',
//   as: "region", 
// });

//Provinces to City/Municipalities
// db.provinces.hasMany(db.cityMuns, { as: "cityMuns",  foreignKey: "Code",
// targetkey: 'regCode' });
// db.cityMuns.belongsTo(db.provinces, {
//   foreignKey: "provCode",
//   targetkey: 'provCode',
//   as: "province",
// });



// CityMun to Barangays
db.supporter.belongsTo(db.location);
db.user.belongsTo(db.supporter);

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

db.ROLES = ["user", "admin", "moderator"];


module.exports = db;