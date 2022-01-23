const { authJwt } = require("../middleware");
const postController = require("../controllers/admin/Post.controller");
const updateController = require("../controllers/admin/Update.controller");
const getController = require("../controllers/admin/Get.controller");
const deleteController = require("../controllers/admin/Delete.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  //Post
  app.post("/api/option", postController.postOption);
  app.post("/api/post", [authJwt.verifyToken], postController.newPost);
  // app.post("/api/upload", postController.uploadFile);



  //Update
  app.put("/api/post/:id", updateController.updatePost);
  // app.put("/api/post/:id", updateController.updatePost);
  // app.put("/api/upload/:id", updateController.updateUpload);
  
  //Delete
  app.delete("/api/post/:id", deleteController.deletePost);
  app.delete("/api/media/:id", deleteController.deleteMedia);
  // app.delete("/api/post/:id", deleteController.deletePost);
  // app.delet("/api/upload/:id", deleteController.deleteUpload);

  //Get  
  // app.get("/api/supporters", controller.getAllSupporters);
  app.get("/api/organizations/:regCode", getController.getOrganization);
  // app.get("/api/verify/:id", controller.verifyUser)


  // app.get("/api/get/supporters-count", controller.getAllSupportersCount);
  // app.get("/api/get/organization", controller.getOrganization);
  // app.get("/api/region/provinces", controller.getRegionProvinces);
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
