const controller = require("../controllers/sms.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/sms/send", controller.sendSms);
  app.post("/api/sms/sendAll", controller.sendAllSms);
  app.post("/api/sms", controller.smsData);

    //GET
  // app.get("/api/sms", controller.verifySms);
  app.get("/api/sms/mobiles", controller.getAllMobile)
  app.get("/api/sms/test", controller.testEndpoint);
  app.get("/api/sms", controller.verifySms);
};