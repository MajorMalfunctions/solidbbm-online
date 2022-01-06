module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
      address: {
        type: Sequelize.STRING
      },
      psgcCode: {
        type: Sequelize.STRING
      },
      brgyDesc: {
        type: Sequelize.STRING
      },
      citymunDesc: {
        type: Sequelize.STRING
      },
      provDesc: {
        type: Sequelize.STRING
      },
      regDesc: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.DECIMAL(10, 8)
      },
      lng: {
        type: Sequelize.DECIMAL(11, 8)
      }
    });
    return Location;
  };

  