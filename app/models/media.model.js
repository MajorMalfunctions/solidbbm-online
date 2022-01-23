module.exports = (sequelize, Sequelize) => {
    const Media = sequelize.define("media", {
      fileName: {
        type: Sequelize.STRING
      },
      pathName: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      fileType: {
          type: Sequelize.STRING
      },
      fileFormat: {
        type: Sequelize.STRING
      },
      isDeleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      }
    });
    return Media;
  };

  