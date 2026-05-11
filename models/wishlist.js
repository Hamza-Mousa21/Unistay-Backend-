const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    static associate(models) {
      // define association here
      WishList.belongsTo(models.Student,{
        foreignKey:"user_id",
        onDelete:"CASCADE"
      })
    }
  }
  WishList.init({
    user_Id: DataTypes.INTEGER,
    res_id: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'WishList',
  });
  return WishList;
};
