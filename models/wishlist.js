const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    static associate(models) {
      // define association here
    }
  }
<<<<<<< HEAD
  WishList.init({
    userId: DataTypes.INTEGER,
    res_id: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'WishList',
  });
=======

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

>>>>>>> Sewar-Backend
  return WishList;
};
