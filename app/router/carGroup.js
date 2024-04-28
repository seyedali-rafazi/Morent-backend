const expressAsyncHandler = require("express-async-handler");
const {
  CarGroupController,
} = require("../http/controllers/admin/carGroups/carGroups");

const router = require("express").Router();

router.get("/list", expressAsyncHandler(CarGroupController.getListOfCarGroups));

router.get("/:id", expressAsyncHandler(CarGroupController.getCarGroupById));
module.exports = {
  carGroupRoutes: router,
};
