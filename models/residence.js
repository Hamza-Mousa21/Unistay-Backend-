"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Residence extends Model {
    static associate(models) {
      // ✅ ربط مع الأونر
      Residence.belongsTo(models.Owner, {
        foreignKey: "owner_id",
        onDelete: "CASCADE",
      });

      Residence.hasMany(models.ResidenceImage, {
        foreignKey: "res_id",
        onDelete: "CASCADE",
      });

      Residence.hasMany(models.Rating, {
        foreignKey: "res_id",
        onDelete: "CASCADE",
      });

      Residence.hasMany(models.WishList, {
        foreignKey: "res_id",
        onDelete: "CASCADE",
      });
    }
  }

  Residence.init(
    {
      res_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      // ✅ حقول جديدة من الفرونت اند
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      housing_type: {
        type: DataTypes.ENUM("شقة", "غرفة", "استوديو", "منزل"),
        allowNull: false,
      },

      available_for: {
        type: DataTypes.ENUM("طلاب", "طالبات", "الكل"),
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      rent_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 1,
        },
      },

      distance_from_university: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      floor_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      building_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      wifi: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      parking: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      security: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Residence",
      tableName: "Residence",
      timestamps: false,
    },
  );

  return Residence;
};
