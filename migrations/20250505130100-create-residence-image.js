"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Residence_Image", {
      image_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Residence_Image");
  },
};