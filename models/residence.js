"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Residence extends Model {
    static associate(models) {
      Residence.belongsTo(models.Owner, {
        foreignKey: "owner_id",
        onDelete: "CASCADE",
      });

      Residence.hasMany(models.ResidenceImage, {
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

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      floor_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      rent_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 1,
        },
      },

      building_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Residence",
      tableName: "Residence",
      timestamps: false,
    }
  );

  return Residence;
};