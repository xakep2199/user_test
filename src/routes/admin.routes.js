const adminRouter = require("express").Router();
const AdminController = require("../controllers/Admin.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");
const checkRole = require("../middleware/checkRole");

adminRouter
  .use(verifyAccessToken)
  .use(checkRole("admin"))

  .get("/users", AdminController.getAllUsers)
  .get("/users/:id", AdminController.getUserById)
  .put("/users/:id/block", AdminController.blockUser);

module.exports = adminRouter;
