module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("locations", {
      latitude: {
        type: Sequelize.DECIMAL(10, 8)
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8)
      },
      address: {
        type: Sequelize.STRING
      }
    });
    return Location;
  };

  