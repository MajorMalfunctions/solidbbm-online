module.exports = (sequelize, Sequelize) => {
    const Region = sequelize.define("refregions", {
      psgcCode: {
        type: Sequelize.INTEGER
      },
      regDesc: {
        type: Sequelize.STRING,
      },
      regCode: {
        type: Sequelize.INTEGER.UNSIGNED 
      }
    });
  
    return Region;
  };