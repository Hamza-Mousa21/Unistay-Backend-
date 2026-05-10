const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
<<<<<<< HEAD
      // define association here
      //Wating for the res model to be initialized
      Rating.belongsTo(models.Residence,{
        foreignKey:"res_id",
        onDelete:"CASCADE"
      })
      //Wating for the stu model to be initialized

    }
  }
  Rating.init({
    userId: DataTypes.INTEGER,
    res_id: DataTypes.INTEGER,
    rateDate: DataTypes.DATE,
    starCount: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    issues: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Rating',
  });
=======
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

>>>>>>> Sewar-Backend
  return Rating;
};
