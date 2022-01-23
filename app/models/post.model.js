module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Posts", {
      title: {
        type: Sequelize.STRING
      },
      when: {
        type: Sequelize.STRING
      },
      where: {
        type: Sequelize.STRING
      },
      what: {
        type: Sequelize.STRING
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      postType: {
        type: Sequelize.STRING,
        default: "normal"
      },
      postView: {
        type: Sequelize.STRING
      },
      areaType: {
        type: Sequelize.STRING
      },
      areaCode: {
        type: Sequelize.STRING
      },
      // regCode: {
      //   type: Sequelize.STRING
      // },
      // provCode: {
      //   type: Sequelize.STRING
      // },
      // citymunCode: {
      //   type: Sequelize.STRING
      // },
    });
    return Post;
  };

  