"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ResidenceImage extends Model {
    static associate(models) {
      ResidenceImage.belongsTo(models.Residence, {
        foreignKey: "res_id",
        onDelete: "CASCADE",
      });
    }
  }

  ResidenceImage.init(
    {
        image_id: DataTypes.INTEGER,
        image_url: DataTypes.STRING(500),
        res_id: DataTypes.INTEGER,
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