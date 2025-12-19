const UserService = require("../services/User.service");
const formatResponse = require("../utils/formatResponse");

class UserController {
  static async getProfile(req, res) {
    try {
      const { id } = res.locals.user;

      const user = await UserService.getById(id);

      if (!user) {
        return res
          .status(404)
          .json(formatResponse(404, "Пользователь не найден"));
      }

      res.json(formatResponse(200, "OK", user));
    } catch ({ message }) {
      console.error("======UserController.getProfile===\n", message);
      res.status(500).json(formatResponse(500, "Внутренняя ошибка сервера"));
    }
  }

  static async blockUser(req, res) {
    try {
      const { id } = res.locals.user;
      const { status } = req.body;

      const updatedStatus = await UserService.setStatus(id, status);

      if (updatedStatus === null) {
        return res
          .status(404)
          .json(formatResponse(404, "Пользователь не найден"));
      }

      const message = status
        ? "Пользователь разблокирован"
        : "Пользователь заблокирован";

      res
        .status(200)
        .json(formatResponse(200, message, { status: updatedStatus }));
    } catch ({ message }) {
      console.error("======UserController.blockSelf===\n", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }
}

module.exports = UserController;
