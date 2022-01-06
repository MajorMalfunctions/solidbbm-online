require('dotenv').config();
module.exports = {
    HOST: process.env.HOST,
    USER: process.env.DBUSER,
    PASSWORD: process.env.PASSWORD,
    DB: "allindb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };