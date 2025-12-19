const { User } = require("../db/models");

class UserService {
  static async getByEmail(email) {
    return (await User.findOne({ where: { email } }))?.get();
  }

  static async create(userData) {
    return await User.create(userData);
  }

  static async getById(id) {
    return (
      (
        await User.findByPk(id, {
          attributes: { exclude: ["password"] },
        })
      )?.get() ?? null
    );
  }
  static async setStatus(id, status) {
    const user = await User.findByPk(id);
    if (!user) return null;

    const updatedUser = await user.update({ status });
    return updatedUser.status;
  }
}

module.exports = UserService;
