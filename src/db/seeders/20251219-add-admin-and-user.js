"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordAdmin = await bcrypt.hash("Admin123!", 10);
    const passwordUser = await bcrypt.hash("User123!", 10);

    await queryInterface.bulkInsert("Users", [
      {
        username: "Admin User",
        email: "admin@example.com",
        password: passwordAdmin,
        role: "admin",
        status: true,
        birthdayDate: new Date("1990-01-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Regular User",
        email: "user@example.com",
        password: passwordUser,
        role: "user",
        status: true,
        birthdayDate: new Date("1995-05-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {
      email: ["admin@example.com", "user@example.com"],
    });
  },
};
