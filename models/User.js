"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
<<<<<<< HEAD
      // A user can have one student profile
      User.hasOne(models.Student, {
=======
      /**
       * ==================================================
       * USER RELATIONSHIPS
       * ==================================================
       * A user can have one owner profile
       */

      User.hasOne(models.Owner, {
>>>>>>> Sewar-Backend
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
<<<<<<< HEAD
        primaryKey: true,
=======

        primaryKey: true,

>>>>>>> Sewar-Backend
        autoIncrement: true,
      },

      first_name: {
        type: DataTypes.STRING(50),
<<<<<<< HEAD
=======

>>>>>>> Sewar-Backend
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING(50),
<<<<<<< HEAD
=======

>>>>>>> Sewar-Backend
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
<<<<<<< HEAD
=======

>>>>>>> Sewar-Backend
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM("admin", "owner", "student"),

        allowNull: false,
<<<<<<< HEAD

        defaultValue: "student",
=======
>>>>>>> Sewar-Backend
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
