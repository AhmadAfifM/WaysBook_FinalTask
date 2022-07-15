"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction_item.belongsTo(models.transaction, {
        foreignKey: "idTransaction",
      });

      transaction_item.belongsTo(models.book, {
        as: "books",
        foreignKey: {
          name: "idBooks",
        },
      });
    }
  }
  transaction_item.init(
    {
      idTransaction: DataTypes.INTEGER,
      idBooks: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction_item",
    }
  );
  return transaction_item;
};
