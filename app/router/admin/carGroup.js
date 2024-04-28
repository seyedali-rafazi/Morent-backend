const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const {
  CarGroupController,
} = require("../../http/controllers/admin/carGroups/carGroups");

router.post("/add", expressAsyncHandler(CarGroupController.addNewCarGroup));
router.patch(
  "/update/:id",
  expressAsyncHandler(CarGroupController.updateCarGroupy)
);
router.delete(
  "/remove/:id",
  expressAsyncHandler(CarGroupController.removeCarGroup)
);

module.exports = {
  carGroupAdminRoutes: router,
};
