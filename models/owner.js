"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    static associate(models) {
      /**
       * Each owner belongs to one user account
       */

      Owner.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  Owner.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },

      phone_num: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      verification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,

      modelName: "Owner",

      tableName: "Owner",

      timestamps: false,
    },
  );

  return Owner;
};
