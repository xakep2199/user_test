const router = require("express").Router();
const formatResponse = require("../utils/formatResponse");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

router.use((req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Маршрут не найден", null, "Маршрут не найден"));
});

module.exports = router;
