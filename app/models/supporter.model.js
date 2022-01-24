module.exports = (sequelize, Sequelize) => {
    const Supporter = sequelize.define("supporter", {
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
      age: {
        type: Sequelize.INTEGER
      },
      contact: {
          type: Sequelize.STRING
      },
      isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  
    return Supporter;
  };

  