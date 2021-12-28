module.exports = (sequelize, Sequelize) => {
  const CityMun = sequelize.define("refcitymuns", {
    psgcCode: {
      type: Sequelize.INTEGER
    },
    citymunDesc: {
      type: Sequelize.STRING
    },
    citymunCode: {
      type: Sequelize.INTEGER
    },
    provCode: {
      type: Sequelize.INTEGER
    },
    regCode: {
      type: Sequelize.INTEGER
    }
  });

  return CityMun;
};