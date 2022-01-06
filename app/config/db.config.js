require('dotenv').config();
module.exports = {
    HOST: process.env.HOST,
    USER: process.env.DBUSER,
    PASSWORD: process.env.PASSWORD,
    DB: "allindb",
    Port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };