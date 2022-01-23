module.exports = (sequelize, Sequelize) => {
    const Options = sequelize.define("options", {
      title: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      }
    });
    return Options;
  };

  