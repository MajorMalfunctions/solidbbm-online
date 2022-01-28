require('dotenv').config();
module.exports = {
    HOST: process.env.SMSHOST,
    USER: process.env.SMSDBUSER,
    PASSWORD: process.env.SMSPASSWORD,
    DB: process.env.SMSDB,
    Port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };