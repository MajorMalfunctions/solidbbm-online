module.exports = (sequelize, Sequelize) => {
  const Barangay = sequelize.define("refbrgies", {
 
    brgyDesc: {
      type: Sequelize.STRING
    },
    brgyCode: {
      type: Sequelize.INTEGER.UNSIGNED
    },
    citymunCode: {
      type: Sequelize.INTEGER.UNSIGNED
    },
    provCode: {
      type: Sequelize.INTEGER
    },
    regCode: {
      type: Sequelize.INTEGER
    }
  });

  return Barangay;
};