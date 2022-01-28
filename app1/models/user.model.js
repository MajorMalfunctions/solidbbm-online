module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      mobile: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      // areaCode: {
      //   type: Sequelize.INTEGER.UNSIGNED 
      // },
      isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  
    return User;
  };

  