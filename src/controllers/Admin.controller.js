const AdminService = require("../services/Admin.service");
const formatResponse = require("../utils/formatResponse");

class AdminController {
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await AdminService.getById(id);

      if (!user) {
        return res
          .status(404)
          .json(formatResponse(404, `Пользователь с id=${id} не найден`));
      }

      res.status(200).json(formatResponse(200, "OK", user));
    } catch ({ message }) {
      console.error("======AdminController.getUserById===\n", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await AdminService.getAll();

      res.status(200).json(formatResponse(200, "OK", users));
    } catch ({ message }) {
      console.error("======AdminController.getAllUsers===\n", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }

  static async blockUser(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedStatus = await AdminService.setStatus(id, status);

      if (updatedStatus === null) {
        return res
          .status(404)
          .json(formatResponse(404, `Пользователь с id=${id} не найден`));
      }

      const message = status
        ? "Пользователь разблокирован"
        : "Пользователь заблокирован";

      res
        .status(200)
        .json(formatResponse(200, message, { status: updatedStatus }));
    } catch ({ message }) {
      console.error("======AdminController.blockUser===\n", message);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
  }
}

module.exports = AdminController;
