"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  book.init(
    {
      title: DataTypes.STRING,
      publicDate: DataTypes.DATE,
      pages: DataTypes.STRING,
      isbn: DataTypes.STRING,
      price: DataTypes.STRING,
      desc: DataTypes.TEXT,
      bookCover: DataTypes.STRING,
      fileDoc: DataTypes.STRING,
      author: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return book;
};
