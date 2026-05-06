"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Residence_Image", {
      image_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      image_url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },

      res_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Residence",
          key: "res_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Residence_Image");
  },
};