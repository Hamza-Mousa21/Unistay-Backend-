"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert("Users", [
      {
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "owner",
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane@example.com",
        password: hashedPassword,
        role: "student",
      },
      {
        first_name: "Admin",
        last_name: "User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};