module.exports = (sequelize, Sequelize) => {
  const Province = sequelize.define("refprovinces", {
    psgcCode: {
      type: Sequelize.INTEGER
    },
    provDesc: {
      type: Sequelize.STRING
    },
    provCode: {
      type: Sequelize.INTEGER
    },
    regCode: {
      type: Sequelize.INTEGER
    }
  });

  return Province;
};