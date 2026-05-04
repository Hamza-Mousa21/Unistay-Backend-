'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Wating for the res model to be initialized
      //Wating for the stu model to be initialized

    }
  }
  Rating.init({
    userId: DataTypes.INTEGER,
    residentId: DataTypes.INTEGER,
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