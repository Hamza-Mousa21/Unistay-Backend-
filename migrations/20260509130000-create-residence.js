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

      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      housing_type: {
        type: Sequelize.ENUM("شقة", "غرفة", "استوديو", "منزل"),
        allowNull: false,
      },

      available_for: {
        type: Sequelize.ENUM("طلاب", "طالبات", "الكل"),
        allowNull: false,
      },

      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      neighborhood: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      rent_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      distance_from_university: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      floor_num: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      building_num: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      capacity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      rooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      wifi: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      parking: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      security: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      is_available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Residence");
  },
};
