"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Residence", {
      res_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      floor_num: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      rent_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      building_num: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Owner",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Residence");
  },
};