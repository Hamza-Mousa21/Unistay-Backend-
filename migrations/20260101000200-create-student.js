"use strict";

/** @type {import("sequelize-cli").Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Students", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,

        references: {
          model: "Users",
          key: "user_id",
        },

        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      major: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      year_of_study: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Students");
  },
};
