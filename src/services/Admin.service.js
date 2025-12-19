const { User } = require("../db/models");

class AdminService {
  static async getById(id) {
    return (
      (
        await User.findByPk(id, { attributes: { exclude: ["password"] } })
      )?.get() ?? null
    );
  }
  static async getAll() {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["id", "ASC"]],
    });
    return users.map((u) => u.get());
  }
  static async setStatus(id, status) {
    const user = await User.findByPk(id);
    if (!user) return null;

    const updatedUser = await user.update({ status });
    return updatedUser.status;
  }
}

module.exports = AdminService;
