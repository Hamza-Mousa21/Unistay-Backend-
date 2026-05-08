"use strict";

/** @type {import("sequelize-cli").Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {

    /**
     * Owner table
     * Stores owner-specific information linked to Users table
     */

    await queryInterface.createTable("Owner", {

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

      phone_num: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      verification: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable("Owner");

  },
};