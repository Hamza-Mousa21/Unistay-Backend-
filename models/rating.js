const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      // define association here (waiting for res/stu models)
    }
  }

  Rating.init(
    {
      userId: DataTypes.INTEGER,
      residentId: DataTypes.INTEGER,
      rateDate: DataTypes.DATE,
      starCount: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      issues: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Rating",
    },
  );

  return Rating;
};
