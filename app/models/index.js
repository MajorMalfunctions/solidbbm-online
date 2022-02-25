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
db.post = require("./post.model.js")(sequelize, Sequelize);
db.media = require("./media.model.js")(sequelize, Sequelize);
db.mobile = require("./mobile.model.js")(sequelize, Sequelize);
db.options = require("./options.model.js")(sequelize, Sequelize);


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
db.supporter.belongsTo(db.location, {
  constraints: false
});
db.user.belongsTo(db.supporter, {
  constraints: false
});

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

db.supporter.belongsToMany(db.mobile, {
  through: "supporter_mobiles",
  foreignKey: "supporterId",
  otherKey: "mobileId"
});

db.mobile.belongsToMany(db.supporter, {
  through: "supporter_mobiles",
  foreignKey: "mobileId",
  otherKey: "supporterId"
});

db.user.belongsTo(db.media, {as: 'UserProfile', constraints: false})
// db.media.belongsTo(db.user, {as: 'UserProfile', constraints: false})


db.user.hasMany(db.post)
db.post.belongsTo(db.user)



db.post.hasMany(db.media, {as: 'PostMedia', constraints: false})
db.media.belongsTo(db.post, {
  constraints: false
});



//psgc relations;
db.regions.hasMany(db.provinces, { as: 'RegionProvince', foreignKey: 'regCode', sourceKey: 'regCode',
constraints: false
});
db.provinces.belongsTo(db.regions, { as: 'RegionProvince', foreignKey: 'regCode', targetKey: 'regCode',
 constraints: false
});

db.provinces.hasMany(db.cityMuns, { as: 'ProvinceCitymun', foreignKey: 'provCode', sourceKey: 'provCode', constraints: false});
db.cityMuns.belongsTo(db.provinces, { as: 'ProvinceCitymun', foreignKey: 'provCode', targetKey: 'provCode', constraints: false});
db.cityMuns.hasMany(db.barangays, { as: 'CitymunBarangay', foreignKey: 'citymunCode', sourceKey: 'citymunCode', constraints: false});
db.barangays.belongsTo(db.cityMuns, { as: 'CitymunBarangay', foreignKey: 'citymunCode', targetKey: 'citymunCode', constraints: false});

//psgc relations;
db.regions.hasMany(db.user, { as: 'RegionLeader', foreignKey: 'areaCode', sourceKey: 'regCode', constraints: false});
db.user.belongsTo(db.regions, { as: 'RegionLeader', foreignKey: 'areaCode', targetKey: 'regCode', constraints: false});
db.provinces.hasMany(db.user, { as: 'ProvinceLeader', foreignKey: 'areaCode', sourceKey: 'provCode', constraints: false});
db.user.belongsTo(db.provinces, { as: 'ProvinceLeader', foreignKey: 'areaCode', targetKey: 'provCode', constraints: false});
db.cityMuns.hasMany(db.user, { as: 'CitymunLeader', foreignKey: 'areaCode', sourceKey: 'citymunCode', constraints: false});
db.user.belongsTo(db.cityMuns, { as: 'CitymunLeader', foreignKey: 'areaCode', targetKey: 'citymunCode', constraints: false});
db.barangays.hasMany(db.user, { as: 'BrangayLeader', foreignKey: 'areaCode', sourceKey: 'brgyCode', constraints: false});
db.user.belongsTo(db.barangays, { as: 'BrangayLeader', foreignKey: 'areaCode', targetKey: 'brgyCode', constraints: false});





//psgc supporter relations;
db.barangays.hasMany(db.supporter, { as: 'BarangaySupport', foreignKey: 'brgyCode', sourceKey: 'brgyCode'
, constraints: false
});
db.supporter.belongsTo(db.barangays, { as: 'BarangaySupport', foreignKey: 'brgyCode', targetKey: 'brgyCode',
 constraints: false
});

db.cityMuns.hasMany(db.supporter, { as: 'CitymunSupport', foreignKey: 'citymunCode', sourceKey: 'citymunCode'
, constraints: false
});
db.supporter.belongsTo(db.cityMuns, { as: 'CitymunSupport', foreignKey: 'citymunCode', targetKey: 'citymunCode',
 constraints: false
});

db.provinces.hasMany(db.supporter, { as: 'ProvinceSupport', foreignKey: 'provCode', sourceKey: 'provCode'
, constraints: false
});
db.supporter.belongsTo(db.provinces, { as: 'ProvinceSupport', foreignKey: 'provCode', targetKey: 'provCode',
 constraints: false
});


db.regions.hasMany(db.supporter, { as: 'RegionSupport', foreignKey: 'regCode', sourceKey: 'regCode'
, constraints: false
});
db.supporter.belongsTo(db.regions, { as: 'RegionSupport', foreignKey: 'regCode', targetKey: 'regCode',
 constraints: false
});

// db.provinces.hasMany(db.cityMuns, { as: 'province_citymun', foreignKey: 'provCode', targetKey: 'provCode'});
// db.cityMuns.belongsTo(db.provinces, { as: 'province_citymun', foreignKey: 'provCode', targetKey: 'provCode'});
// db.cityMuns.hasMany(db.barangays, { as: 'citymun_barangay', foreignKey: 'citymunCode', targetKey: 'citymunCode'});
// db.barangays.belongsTo(db.cityMuns, { as: 'citymun_barangay', foreignKey: 'citymunCode', targetKey: 'citymunCode'});



db.ROLES = ["super", "admin", "user", "region", "province", "citymun", "barangay" ];  

module.exports = db;