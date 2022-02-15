const controller = require("../controllers/sms.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.post("/api/sms/send", controller.sendSms);
  // app.post("/api/sms/:short", controller.smsData);

    //GET
  // app.get("/api/sms", controller.verifySms);
  // app.get("/api/sms/:short", controller.verifySms);
  // app.get("/api/sms/test/:short", controller.testEndpoint);

};