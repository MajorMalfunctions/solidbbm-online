module.exports = (sequelize, Sequelize) => {
  const CityMun = sequelize.define("refcitymuns", {
    psgcCode: {
      type: Sequelize.INTEGER
    },
    citymunDesc: {
      type: Sequelize.STRING
    },
    citymunCode: {
      type: Sequelize.INTEGER.UNSIGNED
    },
    // provCode: {
    //   type: Sequelize.INTEGER.UNSIGNED
    // },
    regCode: {
      type: Sequelize.INTEGER
    }
  });

  return CityMun;
};