module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      birthDate: {
          type: Sequelize.DATE
      },
      mobile: {
          type: Sequelize.STRING
      },
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

  