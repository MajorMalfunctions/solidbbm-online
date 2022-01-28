module.exports = (sequelize, Sequelize) => {
    const Mobile = sequelize.define("mobile", {
      access_token: {
        type: Sequelize.STRING
      },
      subscriber_number: {
        type: Sequelize.STRING
      },
      short: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
       }
    });
    return Mobile;
  };