const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    static associate(models) {
      // define association here
      WishList.belongsTo(models.Student,{
        foreignKey:"user_id",
        onDelete:"CASCADE"
      })

      WishList.belongsTo(models.Residence, { foreignKey: "res_id" }) 
      
    }
  }
  WishList.init({
    user_id: DataTypes.INTEGER,
    res_id: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'WishList',
  });
  return WishList;
};
