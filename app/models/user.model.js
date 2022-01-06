module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      }
    });
  
    return User;
  };

  