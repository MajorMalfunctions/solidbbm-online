module.exports = (sequelize, Sequelize) => {
    const App = sequelize.define("app", {
      appsecret: {
        type: Sequelize.STRING
      },
      appkey: {
        type: Sequelize.STRING
      },
      short: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      subscriberCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      sent: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
    
    return App;
  };