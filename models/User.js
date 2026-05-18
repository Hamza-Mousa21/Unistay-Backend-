"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      /**
       * ==================================================
       * USER RELATIONSHIPS
       * ==================================================
       * A user can have one owner profile
       */

      User.hasOne(models.Owner, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      
       User.hasOne(models.Student, {  
        foreignKey: "user_id",
        onDelete: "CASCADE",
     });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,

        primaryKey: true,

        autoIncrement: true,
      },

      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(100),

        allowNull: false,

        unique: true,

        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM("admin", "owner", "student"),

        allowNull: false,
      },
    },

    {
      sequelize,

      modelName: "User",

      tableName: "Users",

      timestamps: false,
      
    },
  );

  return User;
};
