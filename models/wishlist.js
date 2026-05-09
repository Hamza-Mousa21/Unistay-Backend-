const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    static associate(models) {
      // define association here
    }
  }

  WishList.init(
    {
      userId: DataTypes.INTEGER,
      residentId: DataTypes.INTEGER,
      liked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "WishList",
    },
  );

  return WishList;
};
