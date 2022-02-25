module.exports = (sequelize, Sequelize) => {
    const Options = sequelize.define("options", {
      title: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.STRING
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
    return Options;
  };

  