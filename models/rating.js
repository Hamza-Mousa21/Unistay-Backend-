const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      // define association here
      //Wating for the res model to be initialized
      Rating.belongsTo(models.Residence,{
        foreignKey:"res_id",
        onDelete:"CASCADE"
      })
      Rating.belongsTo(models.Student,{
        foreignKey:"user_id",
        onDelete:"CASCADE"
      })
      //Wating for the stu model to be initialized

    }
  }
  Rating.init({
    user_id: DataTypes.INTEGER,
    res_id: DataTypes.INTEGER,
    rateDate: DataTypes.DATE,
    starCount: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    issues: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
