const userRouter = require("express").Router();
const UserController = require("../controllers/User.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

userRouter
  .get("/profile", verifyAccessToken, UserController.getProfile)
  .put("/block", verifyAccessToken, UserController.blockUser);

module.exports = userRouter;
