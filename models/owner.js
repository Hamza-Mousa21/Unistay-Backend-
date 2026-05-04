import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Owner extends Model {
    static associate(models) {
      Owner.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  Owner.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      phone_num: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      verification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Owner",
      tableName: "Owner",
      timestamps: false,
    },
  );

  return Owner;
};
