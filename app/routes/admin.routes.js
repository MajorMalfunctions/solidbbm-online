const { authJwt } = require("../middleware");
const controller = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/get/supporters", controller.getAllSupporters);
  app.get("/api/get/supporters-count", controller.getAllSupportersCount);

  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );

  // app.get(
  //   "/api/test/merchant",
  //   [authJwt.verifyToken, authJwt.isMerchant],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
  // app.get(
  //   "/api/test/rider",
  //   [authJwt.verifyToken, authJwt.isRider],
  //   controller.adminBoard
  // );
};
