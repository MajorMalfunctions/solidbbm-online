module.exports = (sequelize, Sequelize) => {
    const Mobile = sequelize.define("mobile", {
      mobile: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      }
    });
    return Mobile;
  };

  