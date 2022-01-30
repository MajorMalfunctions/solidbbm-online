const { authJwt, upload } = require("../middleware");
const controller = require("../controllers/user.controller");
const getController = require("../controllers/user/Get.controller");
const postController = require("../controllers/user/Post.controller");


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
  app.post("/api/pinLocation/:id", controller.pinSupporterLocation);
  app.post("/api/update/address/:id", controller.updateAddress);
  app.post("/api/upload/:type", [upload.single('file')], postController.uploadFile);



  //Get

  app.get(
    "/api/allPosts",
    getController.findAllPosts
  );



  app.get(
    "/api/location/search/:lat/:lng",
    controller.searchCoordinates
  );
  app.get("/api/psgc/barangay/:citymunCode", controller.findBrgyByCitymunCode);
  app.get("/api/psgc/citymun/:provCode", controller.findCitymunByProvCode);
  app.get("/api/psgc/province/:regCode", controller.findProvByRegCode);
  app.get("/api/psgc/regions", controller.findRegions);


 //Get
 app.get("/api/supporters-count", getController.getSupportersCount);
 app.get("/api/supporters/barangay/:brgyCode", getController.findBarangaySupporters);
 app.get("/api/provinces", getController.findProvinceCitymun);
 app.get("/api/regions", getController.findRegionProvinces);
};



