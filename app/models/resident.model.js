module.exports = (sequelize, Sequelize) => {
    const Resident = sequelize.define("resident", {
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
      address: {
          type: Sequelize.STRING
      },
      brgyCode: {
          type: Sequelize.STRING
      },
      isVerified: {
          type: Sequelize.BOOLEAN,
          default: false
      }
    });
  
    return Resident;
  };

  