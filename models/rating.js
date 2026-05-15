const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.Residence, {
        foreignKey: "res_id",
        onDelete: "CASCADE",
      });
      Rating.belongsTo(models.Student, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Rating.init(
    {
      user_id: DataTypes.INTEGER,
      res_id: DataTypes.INTEGER,
      rateDate: DataTypes.DATE,
      starCount: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      issues: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Rating",
      tableName: "Rating",
      timestamps: false,
    },
  );
  return Rating;
};
