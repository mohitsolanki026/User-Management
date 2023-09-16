const route = require("express").Router();
const Authmiddleware = require("../middlewares/requireUser");
const dataController = require("./../controllers/dataController");


route.get("/details",dataController.getUserDetails);
route.put("/update",Authmiddleware,dataController.updateUserDetails);
route.get("/image",dataController.getUserImage);
route.post("/insert",Authmiddleware,dataController.insertUser);
route.delete("/delete",dataController.deleteUser);

module.exports = route;