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
    } catch (e) {
      res.status(500).json(formatResponse(500, "Server error"));
    }
  }
}

module.exports = UserController;
