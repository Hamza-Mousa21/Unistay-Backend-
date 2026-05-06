"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ResidenceImage extends Model {
    static associate(models) {
      // Each image belongs to one residence
      ResidenceImage.belongsTo(models.Residence, {
        foreignKey: "res_id",
        onDelete: "CASCADE",
      });
    }
  }

  ResidenceImage.init(
    {
      image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      image_url: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },

      res_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ResidenceImage",
      tableName: "Residence_Image",
      timestamps: false,
    }
  );

  return ResidenceImage;
};