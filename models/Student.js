"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  Student.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      major: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      year_of_study: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Student",
      tableName: "Student",
      timestamps: false,
    },
  );

  return Student;
};
