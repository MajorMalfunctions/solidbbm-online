const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  //Post
  app.post("/api/support/details", controller.createSupporterDetails);
  app.post("/api/update/address/:id", controller.updateAddress);




  //Get
  app.get("/api/support/pinLocation/:lat/:lng/:id", controller.pinSupporterLocation);

  app.get(
    "/api/location/search/:lat/:lng",
    controller.searchCoordinates
  );
  app.get("/api/psgc/:citymunCode", controller.findBrgyByCitymunCode);
  app.get("/api/psgc/:provCode", controller.findCitymunByProvCode);
  app.get("/api/psgc/:regCode", controller.findProvByRegCode);
  app.get("/api/psgc/regions", controller.findRegions);


};



